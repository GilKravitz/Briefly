import psycopg2, os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Access the environment variables
db_host = os.getenv("DB_HOST")
db_port = os.getenv("DB_PORT")
db_name = os.getenv("DB_NAME")
db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")

def read_sql_file(filename):
    script_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(script_dir, filename)
    try:
        with open(file_path, 'r', encoding='utf-8') as file:  # First try UTF-8
            return file.read()
    except UnicodeDecodeError:
        with open(file_path, 'r', encoding='windows-1255') as file:  # Fallback to Windows-1255
            return file.read()

# Read SQL commands from query.sql file
sql_commands = read_sql_file('query.sql')

# Establish connection and execute query
try:
    conn = psycopg2.connect(
        host=db_host,
        port=db_port,
        database=db_name,
        user=db_user,
        password=db_password
    )
    print("Connected to database successfully!")

    # Create a cursor object
    cursor = conn.cursor()
    
    # Execute each SQL command
    for command in sql_commands.split(';'):
        if command.strip() != '':
            cursor.execute(command)
            print("Command executed successfully.")
    
    # Commit the transaction
    conn.commit()
    
    # Fetch all rows
    rows = cursor.fetchall()

    # Print the rows
    with open("articles.txt", "w", encoding="utf-8") as file:
        for row in rows:
            file.write("id: ")
            file.write(str(row[0]))
            file.write("\n")
            file.write("link: ")
            file.write(str(row[1]))
            file.write("\n")
            file.write("data:\n")
            file.write(str(row[2]))
            file.write("\n")
            file.write("title: ")
            file.write(str(row[3]))
            file.write("\n")  
            file.write("time: ")
            file.write(str(row[4]))
            file.write("\n")
            file.write("category: ")
            file.write(str(row[5]))
            file.write("\n\n")             

except psycopg2.Error as e:
    print(f"Error connecting to database: {e}")
finally:
    # Close cursor and connection
    if cursor is not None:
        cursor.close()
    if conn is not None:
        conn.close()
        print("Connection closed.")

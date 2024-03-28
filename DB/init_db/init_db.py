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
    with open(file_path, 'r') as file:
        return file.read()


# Read SQL commands from init_db.sql file
sql_commands = read_sql_file('init_db.sql')

# Establish connection and execute SQL commands
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
    
except psycopg2.Error as e:
    print(f"Error connecting to database: {e}")
finally:
    # Close cursor and connection
    if cursor is not None:
        cursor.close()
    if conn is not None:
        conn.close()
        print("Connection closed.")

import psycopg2, os
from db_config import host, port, database, user, password

def read_sql_file(filename):
    script_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(script_dir, filename)
    with open(file_path, 'r') as file:
        return file.read()

# Read SQL commands from query.sql file
sql_commands = read_sql_file('query.sql')

# Establish connection and execute query
try:
    conn = psycopg2.connect(
        host=host,
        port=port,
        database=database,
        user=user,
        password=password
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
    for row in rows:
        print(row)

except psycopg2.Error as e:
    print(f"Error connecting to database: {e}")
finally:
    # Close cursor and connection
    if cursor is not None:
        cursor.close()
    if conn is not None:
        conn.close()
        print("Connection closed.")

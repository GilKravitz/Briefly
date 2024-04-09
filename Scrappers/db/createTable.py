import psycopg2
from psycopg2 import sql

# Database connection parameters
DB_HOST = "c2dr1dq7r4d57i.cluster-czz5s0kz4scl.eu-west-1.rds.amazonaws.com"
DB_PORT = 5432
DB_NAME = "d4qf0b048n7rtt"
DB_USER = "u8pv84gfm2e9fj"
DB_PASSWORD = "p86201993bc3e372fbaf71c6506f4ad6c591df2a65cd65dfa689ab624a0b847f6"

# Connect to the database
conn = psycopg2.connect(
    dbname=DB_NAME,
    user=DB_USER,
    password=DB_PASSWORD,
    host=DB_HOST,
    port=DB_PORT
)

# Create a cursor object
cur = conn.cursor()

# Define the SQL statement to drop the existing table if it exists
drop_table_query = sql.SQL("""
    DROP TABLE IF EXISTS scraped_articles
""")

# Execute the SQL statement to drop the existing table
cur.execute(drop_table_query)


# Define the SQL statement to create the table
create_table_query = sql.SQL("""
        CREATE TABLE scraped_articles (
            id SERIAL NOT NULL,
            link VARCHAR(255) PRIMARY KEY NOT NULL,
            data TEXT,
            title VARCHAR(255) NOT NULL,
            publish_date TIMESTAMP,
            category VARCHAR(50),
            source VARCHAR(50) NOT NULL
        )
    """)

# Execute the SQL statement
cur.execute(create_table_query)

# Commit the transaction
conn.commit()

# Close the cursor and connection
cur.close()
conn.close()

print("Table 'scraped_articles' created successfully.")

import psycopg2
from psycopg2 import sql

db_config = {
    "dbname": "mydb",
    "user": "ofekHanaknik",
    "password": "ofekHamafkir",
    "host": "localhost",  # or the Docker host IP if not running locally
}


# Expected table structure
expected_tables = {
    "users": ["id", "email", "password", "preferences"],
    "merged_articles": ["id", "article", "category", "title"],
    "scraped_articles": ["id", "article", "category", "title", "source"]
}

def test_tables_exist(conn, table_names):
    cur = conn.cursor()
    cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'")
    existing_tables = [table[0] for table in cur.fetchall()]
    missing_tables = [table for table in table_names if table not in existing_tables]
    assert not missing_tables, f"Missing tables: {missing_tables}"
    print("All tables exist.")

def test_table_structure(conn, table_name, expected_columns):
    cur = conn.cursor()
    cur.execute(sql.SQL("SELECT column_name FROM information_schema.columns WHERE table_name = {}").format(sql.Literal(table_name)))
    columns = [col[0] for col in cur.fetchall()]
    assert set(columns) == set(expected_columns), f"Column mismatch in {table_name}. Expected: {expected_columns}, Found: {columns}"
    print(f"{table_name} structure is correct.")

def run_tests():
    try:
        # Connect to the database
        conn = psycopg2.connect(**db_config)

        # Test if all tables exist
        test_tables_exist(conn, expected_tables.keys())

        # Test each table structure
        for table, columns in expected_tables.items():
            test_table_structure(conn, table, columns)

    except Exception as e:
        print(f"Error: {e}")
    finally:
        if conn is not None:
            conn.close()

if __name__ == "__main__":
    run_tests()

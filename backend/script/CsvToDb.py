import pandas as pd
import os
from sqlalchemy import create_engine

# Path to the file on your desktop
file_path = os.path.expanduser('imdb_top_1000.csv')

# Read the CSV file into a DataFrame
df = pd.read_csv(file_path)

# Add an auto-incrementing 'id' column
df.reset_index(inplace=True)
df.rename(columns={'index': 'id'}, inplace=True)

# Your database URL
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:dangit65@localhost:5432"

# Create a SQLAlchemy engine
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Define the table name where the data will be stored
table_name = "imdb_movies"

# Write the DataFrame to PostgreSQL (replace or append as needed)
try:
    df.to_sql(table_name, con=engine, if_exists='replace', index=False, index_label="id")
    print(f"Data successfully written to the table '{table_name}' in PostgreSQL.")
except Exception as e:
    print("Error while writing to the database:", e)

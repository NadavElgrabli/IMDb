import pandas as pd
import os
from sqlalchemy import create_engine

# Path to the file on your desktop
file_path = os.path.expanduser('imdb_top_1000.csv')

# Read the CSV file into a DataFrame
df = pd.read_csv(file_path)

# Add an auto-incrementing 'id' column starting from 1
df['id'] = range(1, len(df) + 1)

# Rename columns as per the requirements
df.rename(columns={
    'Poster_Link': 'Image_Link',
    'Series_Title': 'Title',
    'Released_Year': 'Year',
    'IMDB_Rating': 'Rating',
    'Overview': 'Description'
}, inplace=True)

# Set the 'id' column as the primary key (this will be handled in PostgreSQL later)
# Your database URL
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:dangit65@localhost:5432"

# Create a SQLAlchemy engine
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Define the table name where the data will be stored
table_name = "imdb_movies"

# Write the DataFrame to PostgreSQL
try:
    # Use the 'replace' option to overwrite the existing table
    df.to_sql(table_name, con=engine, if_exists='replace', index=False, index_label="id")

    # Now, modify the table to add primary key and auto-increment on 'id'
    with engine.connect() as conn:
        conn.execute("""
        ALTER TABLE imdb_movies
        ADD PRIMARY KEY (id);
        
        ALTER TABLE imdb_movies
        ALTER COLUMN id SET DEFAULT nextval('imdb_movies_id_seq'::regclass);
        """)

    print(f"Data successfully written to the table '{table_name}' in PostgreSQL.")
except Exception as e:
    print("Error while writing to the database:", e)

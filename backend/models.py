from sqlalchemy import Column, Integer, BigInteger, Text, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

SQLALCHEMY_DATABASE_URL = "postgresql://postgres:dangit65@localhost:5432"

Base = declarative_base()
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class Movie(Base):
    __tablename__ = "imdb_movies"
    
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)  # Ensure autoincrement=True
    Image_Link = Column(Text, nullable=True)
    Title = Column(Text, nullable=False)
    Year = Column(Integer, nullable=False)
    Genre = Column(Text, nullable=True)
    Rating = Column(Float, nullable=True)
    Description = Column(Text, nullable=True)
    Director = Column(Text, nullable=True)
    Star1 = Column(Text, nullable=True)
    Star2 = Column(Text, nullable=True)
    Star3 = Column(Text, nullable=True)
    Star4 = Column(Text, nullable=True)

Base.metadata.create_all(bind=engine)

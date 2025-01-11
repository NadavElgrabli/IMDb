# main.py
from fastapi import FastAPI, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List
from backend.models import SessionLocal, Movie
from fastapi.middleware.cors import CORSMiddleware
from backend.utils.sorting import apply_sorting  # Import the sorting logic

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class MovieBase(BaseModel):
    Image_Link: str
    Title: str
    Year: int
    Certificate: str
    Runtime: str
    Genre: str
    Rating: float
    Description: str
    Director: str
    Star1: str
    Star2: str
    Star3: str
    Star4: str

class MovieCreate(MovieBase):
    pass

class MovieResponse(MovieBase):
    id: int

    class Config:
        orm_mode = True

@app.get("/")
async def root():
    return {"message": "Welcome to the IMDb Movies API!"}

@app.get("/movies", response_model=List[MovieResponse])
def get_movies(
    skip: int = 0,
    limit: int = 10,
    sort_by: str = Query("rating", regex="^(rating|year|title|genre|runtime)$"),  # Default sorting by rating
    sort_order: str = Query("desc", regex="^(asc|desc)$"),  # Default to descending order
    db: Session = Depends(get_db),
):
    query = db.query(Movie)
    
    # Apply sorting logic
    query = apply_sorting(query, sort_by, sort_order)
    
    # Apply pagination
    movies = query.offset(skip).limit(limit).all()
    return movies

@app.post("/movies", response_model=MovieResponse)
def create_movie(movie: MovieCreate, db: Session = Depends(get_db)):
    db_movie = Movie(**movie.dict())
    db.add(db_movie)
    db.commit()
    db.refresh(db_movie)
    return db_movie

@app.get("/movies/{movie_id}", response_model=MovieResponse)
def get_movie(movie_id: int, db: Session = Depends(get_db)):
    movie = db.query(Movie).filter(Movie.id == movie_id).first()
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    return movie

@app.put("/movies/{movie_id}", response_model=MovieResponse)
def update_movie(movie_id: int, movie: MovieCreate, db: Session = Depends(get_db)):
    db_movie = db.query(Movie).filter(Movie.id == movie_id).first()
    if not db_movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    for key, value in movie.dict().items():
        setattr(db_movie, key, value)
    db.commit()
    db.refresh(db_movie)
    return db_movie

@app.delete("/movies/{movie_id}")
def delete_movie(movie_id: int, db: Session = Depends(get_db)):
    db_movie = db.query(Movie).filter(Movie.id == movie_id).first()
    if not db_movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    db.delete(db_movie)
    db.commit()
    return {"detail": "Movie deleted successfully"}
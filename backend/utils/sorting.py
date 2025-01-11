# sortng.py
from sqlalchemy.orm import Query
from sqlalchemy import asc, desc
from backend.models import Movie

def apply_sorting(query: Query, sort_by: str, sort_order: str) -> Query:
    sort_column = None

    if sort_by == "rating":
        sort_column = Movie.Rating
    elif sort_by == "year":
        sort_column = Movie.Year
    elif sort_by == "title":
        sort_column = Movie.Title
    elif sort_by == "runtime":
         sort_column = Movie.Runtime
    elif sort_by == "genre":
        sort_column = Movie.Genre

    if sort_column:
        if sort_order == "asc":
            query = query.order_by(asc(sort_column))
        else:  # Default to descending order
            query = query.order_by(desc(sort_column))

    return query

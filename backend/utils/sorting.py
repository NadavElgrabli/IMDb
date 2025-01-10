from sqlalchemy.orm import Query
from sqlalchemy import asc, desc
from backend.models import Movie

def apply_sorting(query: Query, sort_by: str, sort_order: str) -> Query:
    """
    Apply sorting to a SQLAlchemy query.
    
    Parameters:
    - query (Query): The SQLAlchemy query object.
    - sort_by (str): The column to sort by ("rating", "year", "title", "genre").
    - sort_order (str): The sort order ("asc" or "desc").
    
    Returns:
    - Query: The sorted query.
    """
    sort_column = None

    if sort_by == "rating":
        sort_column = Movie.Rating
    elif sort_by == "year":
        sort_column = Movie.Year
    elif sort_by == "title":
        sort_column = Movie.Title
    elif sort_by == "genre":
        sort_column = Movie.Genre

    if sort_column:
        if sort_order == "asc":
            query = query.order_by(asc(sort_column))
        else:  # Default to descending order
            query = query.order_by(desc(sort_column))

    return query

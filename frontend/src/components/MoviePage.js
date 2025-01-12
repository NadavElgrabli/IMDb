// MoviePage.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./../styles/MoviePage.css";

const MoviePage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/movies/${movieId}`);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-page">
      <h1>{movie.Title}</h1>
      <div className="movie-info">
        <p>
          <strong>Year:</strong> {movie.Year}
        </p>
        <p>
          <strong>Certificate:</strong> {movie.Certificate}
        </p>
        <p>
          <strong>Runtime:</strong> {movie.Runtime}
        </p>
        <img src={movie.Image_Link} alt={movie.Title} />
      </div>
      <div className="movie-genres">
        <strong>Genres:</strong> {movie.Genre}
      </div>
      <div className="movie-director">
        <strong>Director:</strong> {movie.Director}
      </div>
      <div className="movie-stars">
        <strong>Stars:</strong> {movie.Star1}, {movie.Star2}, {movie.Star3},{" "}
        {movie.Star4}
      </div>
    </div>
  );
};

export default MoviePage;

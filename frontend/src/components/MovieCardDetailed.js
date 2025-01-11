//MovieCardDetailed.js
import React from "react";
import "./../styles/MovieCardDetailed.css";
import MovieCardCompact from "./MovieCardCompact";

const MovieCardDetailed = ({ movie, index }) => {
  // Collect the stars into an array
  const stars = [movie.Star1, movie.Star2, movie.Star3, movie.Star4];

  return (
    <div className="movie-card-detailed">
      <MovieCardCompact movie={movie} index={index} isDetailedView={true}></MovieCardCompact>
      <div>
        <p className="movie-description">{movie.Description}</p>
        <div className="movie-director-stars">
          <span className="label">Director</span>{" "}
          <a href={`#www`}>{movie.Director}</a>
          <span className="label">Stars</span>{" "}
          {stars
            .filter((star) => star) // Filter out empty star values (if any)
            .map((star, index) => (
              <a key={index} href={`#www`}>
                {star}
                {index < stars.length - 1 && " "}
              </a>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCardDetailed;

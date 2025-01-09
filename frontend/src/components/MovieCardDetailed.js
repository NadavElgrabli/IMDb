import React from "react";
import "./../styles/MovieCardDetailed.css";
import MovieCardCompact from "./MovieCardCompact";

const MovieCardDetailed = ({ movie }) => {
  return (
    <div className="movie-card-detailed">
      <MovieCardCompact movie={movie} isDetailedView={true}></MovieCardCompact>
      <div>
        <p className="movie-description">{movie.description}</p>
        <div className="movie-director-stars">
          <span className="label">Director</span>{" "}
          <a href={`#www`}>{movie.director}</a>
          <span className="label">Stars</span>{" "}
          {movie.stars.split(", ").map((star, index) => (
            <a key={index} href={`#www`}>
              {star}
              {index < movie.stars.split(", ").length - 1 && " "}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCardDetailed;

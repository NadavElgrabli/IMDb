// MovieList.js
import React from "react";
import MovieCardDetailed from "./MovieCardDetailed";
import MovieCardCompact from "./MovieCardCompact";
import MovieCardGrid from "./MovieCardGrid";
import "./../styles/MovieList.css";

const MovieList = ({ movies, viewType }) => {
    const className = viewType === "grid" ? "movie-card-grid" : "movie-list";
  
    return (
      <div className={className}>
        {movies.map((movie, index) => {
          if (viewType === "detailed") {
            return <MovieCardDetailed key={movie.id} movie={movie} index={index + 1}/>;
          }
          if (viewType === "compact") {
            return <MovieCardCompact key={movie.id} movie={movie} index={index + 1}/>;
          }
          return <MovieCardGrid key={movie.id} movie={movie} index={index + 1}/>;
        })}
      </div>
    );
  };
  
  export default MovieList;
  
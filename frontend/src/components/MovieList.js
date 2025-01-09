import React from "react";
import MovieCardDetailed from "./MovieCardDetailed";
import MovieCardCompact from "./MovieCardCompact";
import MovieCardGrid from "./MovieCardGrid";
import "./../styles/MovieList.css";

const MovieList = ({ movies, viewType }) => {
    const className = viewType === "grid" ? "movie-card-grid" : "movie-list";
  
    return (
      <div className={className}>
        {movies.map((movie) => {
          if (viewType === "detailed") {
            return <MovieCardDetailed key={movie.id} movie={movie} />;
          }
          if (viewType === "compact") {
            return <MovieCardCompact key={movie.id} movie={movie} />;
          }
          return <MovieCardGrid key={movie.id} movie={movie} />;
        })}
      </div>
    );
  };
  
  export default MovieList;
  
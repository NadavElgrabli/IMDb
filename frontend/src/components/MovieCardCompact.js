import React, { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa6";
import { RiInformationLine } from "react-icons/ri";
import { IoBookmarkSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import MovieDialog from "./MovieDialog";
import { Link } from "react-router-dom";
import "./../styles/MovieCardCompact.css";

const MovieCardCompact = ({ movie, index, isDetailedView = false }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className={isDetailedView ? "movie-card detailed-view" : "movie-card"}>
      <div className="bookmark-icon">
        <IoBookmarkSharp />
        <FaPlus className="plus-icon" />
      </div>
      <img src={movie.Image_Link} alt={movie.Title} />
      <div className="movie-details">
        <h3>
          {index}.{" "}
          <Link to={`/movies/${movie.id}`} className="movie-title-link">
            {movie.Title}
          </Link>
        </h3>
        <p className="movie-meta">
          <span>{movie.Year}</span>
          <span>{movie.Runtime}</span>
          <span>{movie.Certificate}</span>
        </p>
        <div className="movie-rating">
          <FaStar className="star-icon" />
          <span className="rating-value">{movie.Rating}</span>
          <button className="rate-button">
            <FaRegStar className="rate-star-icon" />
            Rate
          </button>
        </div>
      </div>
      <RiInformationLine className="info-button" onClick={handleDialogOpen} />

      {/* Render MovieDialog */}
      <MovieDialog
        movie={movie}
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
      />
    </div>
  );
};

export default MovieCardCompact;

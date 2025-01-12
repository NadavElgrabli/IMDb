// MovieCardGrid.js
import React, { useState } from "react";
import { IoBookmarkSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6"; 
import { FaRegStar } from "react-icons/fa"; 
import MovieDialog from "./MovieDialog"; 
import "./../styles/MovieCardGrid.css";

const MovieCardGrid = ({ movie, index }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false); 

  const handleDialogOpen = () => {
    setIsDialogOpen(true); 
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false); 
  };

  const truncateTitle = (title, maxLength) =>
    title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;

  return (
    <div className="movie-card-grid">
      <div className="movie-card-item">
        <div className="movie-poster">
          <img src={movie.Image_Link} alt={movie.Title} />
          <div className="bookmark-icon-grid">
            <IoBookmarkSharp />
            <FaPlus className="plus-icon" />
          </div>
        </div>
        <div className="movie-info">
          <div className="movie-rating">
            <FaStar className="star-icon" />
            <span className="rating-value">{movie.Rating}</span>
            <button className="rate-button-grid">
              <FaRegStar className="rate-star-icon" />
              Rate
            </button>
          </div>
          <p className="movie-title">
            {index}.{" "}
            <span
              className="clickable-title-grid"
              title={movie.Title} // Show full title on hover
            >
              {truncateTitle(movie.Title, 12)}
            </span>
          </p>          <div className="movie-meta">
            <span>{movie.Year}</span>
            <span>{movie.Runtime}</span>
          </div>
        </div>
        <button className="details-button-grid" onClick={handleDialogOpen}>
          Details
        </button>
      </div>

      {/* Render MovieDialog when isDialogOpen is true */}
      <MovieDialog
        movie={movie}
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
      />
    </div>
  );
};

export default MovieCardGrid;

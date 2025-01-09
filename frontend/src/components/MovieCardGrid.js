import React from "react";
import "./../styles/MovieCardGrid.css";
import { IoBookmarkSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6"; // Filled star for rating
import { FaRegStar } from "react-icons/fa"; // Outlined star for the Rate button

const MovieCardGrid = ({ movie }) => {
  return (
    <div className="movie-card-grid">
      <div className="movie-card-item">
        <div className="movie-poster">
          <img src={movie.poster} alt={movie.title} />
          <div className="bookmark-icon-grid">
            <IoBookmarkSharp />
            <FaPlus className="plus-icon" />
          </div>
        </div>
        <div className="movie-info">
          <div className="movie-rating">
            <FaStar className="star-icon" />
            <span className="rating-value">{movie.rating}</span>
            <button className="rate-button-grid">
              <FaRegStar className="rate-star-icon" />
              Rate
            </button>
          </div>
          <p className="movie-title">{movie.title}</p>
          <div className="movie-meta">
            <span>{movie.year}</span>
            <span>{movie.duration}</span>
          </div>
        </div>
        <button className="details-button-grid">Details</button>
      </div>
    </div>
  );
};

export default MovieCardGrid;

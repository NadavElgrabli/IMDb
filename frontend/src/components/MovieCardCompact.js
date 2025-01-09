import React from "react";
import { FaStar } from "react-icons/fa6"; // Filled star for rating
import { FaRegStar } from "react-icons/fa"; // Outlined star for the Rate button
import { RiInformationLine } from "react-icons/ri"; // Info button icon
import { IoBookmarkSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";

import "./../styles/MovieCardCompact.css";

const MovieCardCompact = ({ movie, isDetailedView = false }) => {
  return (
    <div className={isDetailedView ? "movie-card detailed-view" : "movie-card"}>
      <div className="bookmark-icon">
        <IoBookmarkSharp />
        <FaPlus className="plus-icon" />
      </div>
      <img src={`/${movie.poster}`} alt={movie.title} />
      <div className="movie-details">
        <h3>{movie.title}</h3>
        <p className="movie-meta">
          <span>{movie.year}</span>
          <span>{movie.duration}</span>
          <span>R</span>
        </p>
        <div className="movie-rating">
          <FaStar className="star-icon" />
          <span className="rating-value">{movie.rating}</span>
          <button className="rate-button">
            <FaRegStar className="rate-star-icon" />
            Rate
          </button>
        </div>
      </div>
      <RiInformationLine className="info-button" />
    </div>
  );
};

export default MovieCardCompact;

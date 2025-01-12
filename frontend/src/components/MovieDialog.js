import React from "react";
import { FaRegStar, FaPlay } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import "./../styles/MovieDialog.css";

const MovieDialog = ({ movie, isOpen, onClose }) => {
  if (!isOpen) return null; // Render nothing if the dialog is closed

  return (
    <div className="movie-dialog-overlay">
      <div className="movie-dialog-content">
        <button className="movie-dialog-close-button" onClick={onClose}>
          ✕
        </button>

        {/* Header Section: Image and Details */}
        <div className="movie-dialog-header">
          <img
            src={movie.Image_Link}
            alt={movie.Title}
            className="movie-dialog-image"
          />
          <div className="movie-dialog-details">
            <h2>{movie.Title}</h2>
            <p>
              {movie.Year} <span className="movie-dialog-separator">·</span>{" "}
              {movie.Runtime} <span className="movie-dialog-separator">·</span>{" "}
              {movie.Certificate}
            </p>

            <p>{movie.Genre}</p>
            <div className="movie-dialog-rating">
              <span>⭐ {movie.Rating}/10</span>

              <button className="movie-dialog-rate-button">
                <FaRegStar className="movie-dialog-rate-star-icon" />
                Rate
              </button>
            </div>
          </div>
        </div>

        <p className="movie-dialog-description">{movie.Description}</p>

        {/* Extra Details: Director and Stars */}
        <div className="movie-dialog-extra">
          <p>
            <span className="movie-dialog-label">Director:</span>{" "}
            <span className="movie-dialog-clickable-text">
              {movie.Director}
            </span>
          </p>
          <p>
            <span className="movie-dialog-label">Stars:</span>{" "}
            {movie.Star1 && (
              <span className="movie-dialog-clickable-text">{movie.Star1}</span>
            )}
            {movie.Star2 && (
              <>
                <span className="movie-dialog-separator">·</span>
                <span className="movie-dialog-clickable-text">
                  {movie.Star2}
                </span>
              </>
            )}
            {movie.Star3 && (
              <>
                <span className="movie-dialog-separator">·</span>
                <span className="movie-dialog-clickable-text">
                  {movie.Star3}
                </span>
              </>
            )}
            {movie.Star4 && (
              <>
                <span className="movie-dialog-separator">·</span>
                <span className="movie-dialog-clickable-text">
                  {movie.Star4}
                </span>
              </>
            )}
          </p>
        </div>

        {/* Action Buttons: Trailer and Watchlist */}
        <div className="movie-dialog-buttons">
          <button className="movie-dialog-trailer-button">
            <FaPlay className="movie-dialog-trailer-icon" />
            Trailer
          </button>
          <button className="movie-dialog-watchlist-button">
            <FiPlus className="movie-dialog-watchlist-icon" />
            Watchlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDialog;

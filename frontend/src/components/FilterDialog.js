import React from "react";
import "./../styles/FilterDialog.css";

const FilterDialog = ({ isOpen, onClose }) => {
  // Close the dialog when clicking outside of the dialog box
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("filter-dialog-overlay")) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="filter-dialog-overlay" onClick={handleOverlayClick}>
      <div className="filter-dialog">
        {/* Close Button */}
        <button className="dialog-close-button" onClick={onClose}>
          ✕
        </button>

        {/* Content */}
        <div className="dialog-content">
          {/* Genres Section */}
          <div className="dialog-section">
            <h3 className="section-title">Genres</h3>
            <div className="genres-container">
              {[
                "Drama",
                "Adventure",
                "Thriller",
                "Crime",
                "Action",
                "Comedy",
                "Mystery",
                "War",
                "Fantasy",
                "Sci-Fi",
              ].map((genre, index) => (
                <button key={index} className="genre-button">
                  {genre} (XX)
                </button>
              ))}
            </div>
            <button className="show-all-genres">Show all genres</button>
          </div>

          <hr className="separator-line" color="grey" />

          {/* Release Year Section */}
          <div className="dialog-section">
            <h3 className="section-title">Release Year</h3>
            <div className="year-inputs">
              <input type="number" />
              <span className="to-text">to</span>
              <input type="number" />
            </div>
          </div>

          <hr className="separator-line" color="grey" />

          {/* IMDb Ratings Section */}
          <div className="dialog-section">
            <h3 className="section-title">IMDb Ratings</h3>
            <div className="user-rating-container">
              <div className="user-rating-title">USER RATING</div>
              <div className="year-inputs">
                <input type="number" placeholder="1.0" />
                <span className="to-text">to</span>
                <input type="number" placeholder="10.0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterDialog;

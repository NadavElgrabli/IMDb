// FilterDialog.js
import React, { useState, useEffect } from "react";
import "./../styles/FilterDialog.css";

const FilterDialog = ({
  isOpen,
  onClose,
  setGenres,
  genres,
  onFilterChange,
}) => {
  const [availableGenres, setAvailableGenres] = useState([]);
  const [showAllGenres, setShowAllGenres] = useState(false);

  const [releaseYearFrom, setReleaseYearFrom] = useState("");
  const [releaseYearTo, setReleaseYearTo] = useState("");
  const [ratingFrom, setRatingFrom] = useState("");
  const [ratingTo, setRatingTo] = useState("");

  // Fetch genres from the backend when the component mounts
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/genres");
        const data = await response.json();
        setAvailableGenres(data);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      }
    };

    if (isOpen) {
      fetchGenres();
    }
  }, [isOpen]); // Fetch genres only when the dialog is open

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("filter-dialog-overlay")) {
      onClose();
    }
  };

  const handleGenreClick = (genre) => {
    setGenres((prevGenres) => {
      if (prevGenres.includes(genre)) {
        // If genre is already selected, remove it
        return prevGenres.filter((g) => g !== genre);
      } else {
        // If genre is not selected, add it
        return [...prevGenres, genre];
      }
    });
  };

  const toggleShowAllGenres = () => {
    setShowAllGenres(!showAllGenres);
  };

  // Trigger filters on pressing "Enter"
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onFilterChange({
        release_year_from: releaseYearFrom || null,
        release_year_to: releaseYearTo || null,
        rating_from: ratingFrom || null,
        rating_to: ratingTo || null,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="filter-dialog-overlay" onClick={handleOverlayClick}>
      <div className="filter-dialog">
        <button className="dialog-close-button" onClick={onClose}>
          ✕
        </button>
        <div className="dialog-content">
          {/* Genres Section */}
          <div className="dialog-section">
            <h3 className="section-title">Genres</h3>
            <div className="genres-container">
              {availableGenres.length === 0 ? (
                <p>Loading genres...</p>
              ) : (
                // Show either the first 12 genres or all genres based on showAllGenres state
                (showAllGenres
                  ? availableGenres
                  : availableGenres.slice(0, 12)
                ).map((genre, index) => {
                  const isSelected = genres.includes(genre.genre);
                  return (
                    <button
                      key={index}
                      className={`genre-button ${
                        isSelected ? "genre-button-selected" : ""
                      }`}
                      onClick={() => handleGenreClick(genre.genre)}
                    >
                      {genre.genre} ({genre.count})
                    </button>
                  );
                })
              )}
            </div>
            <button className="show-all-genres" onClick={toggleShowAllGenres}>
              {showAllGenres ? "Show less" : "Show all genres"}
            </button>
          </div>

          <hr className="separator-line" color="grey" />

          {/* Release Year Section */}
          <div className="dialog-section">
            <h3 className="section-title">Release Year</h3>
            <div className="year-inputs">
              <input
                type="number"
                placeholder="From"
                value={releaseYearFrom}
                onChange={(e) => setReleaseYearFrom(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <span className="to-text">to</span>
              <input
                type="number"
                placeholder="To"
                value={releaseYearTo}
                onChange={(e) => setReleaseYearTo(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>

          <hr className="separator-line" color="grey" />

          {/* IMDb Ratings Section */}
          <div className="dialog-section">
            <h3 className="section-title">IMDb Ratings</h3>
            <div className="user-rating-container">
              <div className="user-rating-title">USER RATING</div>
              <div className="year-inputs">
                <input
                  type="number"
                  placeholder="1.0"
                  value={ratingFrom}
                  onChange={(e) => setRatingFrom(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <span className="to-text">to</span>
                <input
                  type="number"
                  placeholder="10.0"
                  value={ratingTo}
                  onChange={(e) => setRatingTo(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterDialog;

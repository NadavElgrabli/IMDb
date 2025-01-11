// FilterSort.js
import React, { useState, useEffect, useRef } from "react";
import { IoFilter } from "react-icons/io5";
import { FaListUl } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiLayoutGrid2Fill } from "react-icons/ri";
import { FaArrowDownLong } from "react-icons/fa6";
import FilterDialog from "./FilterDialog";
import "./../styles/FilterSort.css";

const FilterSort = ({
  onViewChange,
  currentViewType,
  onSortChange,
  setGenres,
  genres,
  movieCount,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState("Ranking"); 
  const [sortOrder, setSortOrder] = useState("desc"); 

  // Create a reference for the dropdown to detect clicks outside of it
  const dropdownRef = useRef(null);

  // Close the dropdown if the user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); 
      }
    };

    // Add event listener for clicks outside the dropdown
    if (isDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    // Clean up the event listener when the dropdown is closed or the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleSortChange = (sortBy) => {
    if (sortBy !== currentSort) {
      setCurrentSort(sortBy);
      setIsDropdownOpen(false);
      onSortChange(sortBy, sortOrder); 
    }
  };

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === "desc" ? "asc" : "desc";
    setSortOrder(newSortOrder);
    onSortChange(currentSort, newSortOrder); 
  };

  return (
    <div className="filter-sort">
      <div className="filter-sort-top">
        <div className="titles-count">{movieCount} Titles</div>{" "}
        {/* Dynamic count */}
        <div className="view-buttons">
          <button
            className={`view-button detailed-view ${
              currentViewType === "detailed" ? "active" : ""
            }`}
            title="Detailed View"
            onClick={() => onViewChange("detailed")}
          >
            <FaListUl />
          </button>
          <button
            className={`view-button grid-view ${
              currentViewType === "grid" ? "active" : ""
            }`}
            title="Grid View"
            onClick={() => onViewChange("grid")}
          >
            <RiLayoutGrid2Fill />
          </button>
          <button
            className={`view-button compact-view ${
              currentViewType === "compact" ? "active" : ""
            }`}
            title="Compact View"
            onClick={() => onViewChange("compact")}
          >
            <GiHamburgerMenu />
          </button>
        </div>
      </div>

      <div className="filter-button-container">
        <button className="filter-button" onClick={() => setIsDialogOpen(true)}>
          <IoFilter />
        </button>
      </div>

      <div className="filter-sort-bottom">
        <div className="sort-section">
          <label>Sort by</label>
          <div className="sort-dropdown" ref={dropdownRef}>
            <button
              className="sort-button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {currentSort} ▼
            </button>
            {isDropdownOpen && (
              <ul className="sort-menu">
                <li onClick={() => handleSortChange("Ranking")}>Ranking</li>
                <li onClick={() => handleSortChange("Release Date")}>
                  Release Date
                </li>
                <li onClick={() => handleSortChange("Alphabetical")}>
                  Alphabetical
                </li>
              </ul>
            )}
          </div>
          <button className="sort-arrow" onClick={toggleSortOrder}>
            <FaArrowDownLong
              style={{
                transform: sortOrder === "desc" ? "rotate(180deg)" : "none",
              }}
            />
          </button>
        </div>
      </div>

      <FilterDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        setGenres={setGenres}
        genres={genres}
      />
    </div>
  );
};

export default FilterSort;

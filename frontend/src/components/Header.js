import React, { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { HiBars3 } from "react-icons/hi2";
import { BiSolidBookmarkPlus } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import "./../styles/Header.css";

const Header = ({ movies }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    if (event.key === "Enter" || event.type === "click") {
      const movie = movies.find(
        (movie) => movie.Title.toLowerCase() === searchTerm.toLowerCase() // Exact match
      );

      if (movie) {
        navigate(`/movies/${movie.id}`);
      } else {
        alert("Movie not found!");
      }
    }
  };

  return (
    <>
      <header>
        <div className="header-left">
          <Link to="/" className="logo-link">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
              alt="IMDb Logo"
              className="logo"
            />
          </Link>
          <button className="menu-button">
            <HiBars3 className="menu-icon" /> Menu
          </button>
          <div className="search-container">
            <button className="all-dropdown">All ▼</button>
            <input
              type="text"
              placeholder="Search IMDb"
              className="search-bar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
            />
            <button className="search-button" onClick={handleSearch}>
              <FaMagnifyingGlass />
            </button>
          </div>
        </div>
        <div className="header-right">
          <button className="header-button imdbpro-button">
            <span className="imdb-text">IMDb</span>
            <span className="pro-text">Pro</span>
          </button>
          <div className="header-separator"></div>
          <button className="header-button watchlist-button">
            <BiSolidBookmarkPlus className="watchlist-icon" /> Watchlist
          </button>
          <button className="header-button signin-button">Sign In</button>
          <button className="language-dropdown">EN ▼</button>
        </div>
      </header>
      <div className="header-extension"></div>
    </>
  );
};

export default Header;

import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6"; // Updated icon
import { HiBars3 } from "react-icons/hi2";
import { BiSolidBookmarkPlus } from "react-icons/bi";
import "./../styles/Header.css";

const Header = () => {
  return (
    <>
      <header>
        <div className="header-left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
            alt="IMDb Logo"
            className="logo"
          />
          <button className="menu-button">
            <HiBars3 className="menu-icon" /> Menu
          </button>
          <div className="search-container">
            <button className="all-dropdown">All ▼</button>
            <input
              type="text"
              placeholder="Search IMDb"
              className="search-bar"
            />
            <button className="search-button">
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
      {/* Additional black space beneath the header */}
      <div className="header-extension"></div>
    </>
  );
};

export default Header;

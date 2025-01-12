import React from "react";
import { IoMdShare } from "react-icons/io"; // Share icon
import "./../styles/MainTitle.css";

const MainTitle = () => {
  return (
    <div className="main-title">
      <div className="main-title-header">
        <h2>IMDb Charts</h2>
        <div className="share-section">
          <span className="share-text">Share</span>
          <button className="share-button" title="Share">
            <IoMdShare />
          </button>
        </div>
      </div>

      {/* Subheading Section */}
      <h1>IMDb Top 1000 Movies</h1>
      <p>As rated by regular IMDb voters.</p>
    </div>
  );
};

export default MainTitle;

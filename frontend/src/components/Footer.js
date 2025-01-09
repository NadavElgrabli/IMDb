import React from "react";
import "./../styles/Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="footer-text">
        © {currentYear} IMDb, All rights reserved.
      </p>
    </footer>
  );
}

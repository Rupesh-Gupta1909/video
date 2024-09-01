import React, { useState } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSlider = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
        <span className="logo-text">Trusted Wearables</span>
      </div>
      <div className="nav-elements">
        <a href="#video">Live & Archived Video</a>
        <a href="#health">Health Metrics</a>
        <a href="#map">Map View</a>
        <a href="#help">Help?</a>
      </div>
      <div className="hamburger" onClick={toggleSlider}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <div className={`side-slider ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleSlider}>
          X
        </button>
        <a href="#video" onClick={toggleSlider}>
          Live & Archived Video
        </a>
        <a href="#health" onClick={toggleSlider}>
          Health Metrics
        </a>
        <a href="#map" onClick={toggleSlider}>
          Map View
        </a>
        <a href="#help" onClick={toggleSlider}>
          Help?
        </a>
      </div>
    </nav>
  );
}

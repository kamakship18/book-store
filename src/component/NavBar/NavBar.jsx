import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logoImage from '../assets/Kalvium-Logo.png'
import Search from "../assets/Search.png";

const Navbar = () => {
  const [search, setSearch] = useState("");

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo-container">
          <Link to="/" className="navbar-brand">
            <img src={logoImage} alt="Logo" className="logo-image" />
          </Link>
        </div>

        <div className="searchbar-container">
          <input
            className="search"
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link to={`/search?q=${encodeURIComponent(search)}`}>
            <button className="search-btn" type="button">
              <span>
                <img src={Search} alt="Search" />
              </span>
            </button>
          </Link>
        </div>

        <div className="registration-container">
          <Link to="/registration">Registration</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

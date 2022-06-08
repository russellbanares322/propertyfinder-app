import React, { useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import "./App.css";
import About from "./components/About";
import Apartments from "./components/ApartmentsFile/Apartments";
import Home from "./components/Home";
import Tips from "./components/Tips";
import { GoThreeBars } from "react-icons/go";
import { GoX } from "react-icons/go";
import ApartmentsDetails from "./components/ApartmentsFile/ApartmentsDetails";

function App() {
  const [isToggle, setIsToggle] = useState(false);

  const handleToggle = () => {
    setIsToggle(!isToggle);
  };

  return (
    <div className="App">
      {/* //Navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-light bg-info shadow p-3"
        id="navbarMenu"
      >
        <div className="container-fluid">
          <Link to="/" className="navbar-brand brand">
            Findee
          </Link>

          <button
            className="navbar-toggler"
            data-target="#navbarMenu"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={handleToggle}
          >
            {isToggle ? (
              <GoX className="close_navbar"></GoX>
            ) : (
              <GoThreeBars className="open_navbar"></GoThreeBars>
            )}
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 pl-4">
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link text-dark home l_text"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link text-dark about l_text">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/tips" className="nav-link text-dark tips l_text">
                  Tips
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/apartments"
                  className="nav-link text-dark tips l_text"
                >
                  Property
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* //Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/apartments" element={<Apartments />} />
        <Route path="apartments/:id/*" element={<ApartmentsDetails />} />
        <Route path="/tips" element={<Tips />} />
      </Routes>
    </div>
  );
}

export default App;

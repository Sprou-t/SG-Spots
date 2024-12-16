import React, { useState, useEffect, useCallback, useRef } from 'react';
import Searchbox from './searchbox.jsx';
import logo from "../assets/navbarImages/borders-2099224.svg";
import { Link } from "react-router-dom";

const Navbar = ({ scrollDirection }) => {
  const oldScrollY = useRef(window.scrollY); // oldScrolly retains its value across renders

  const [direction, setDirection] = useState('up');

  const controlDirection = () => {
    if (window.scrollY > oldScrollY.current) {
      setDirection('down');
    } else {
      setDirection('up');
    }
    oldScrollY.current = window.scrollY;
  }

  useEffect(() => {

    window.addEventListener('scroll', controlDirection, true);

    return () => {
      window.removeEventListener('scroll', controlDirection, true);
    };
  }, []);

  return (
    <div
      className={`z-50 fixed top-0 w-screen bg-transparent backdrop-filter bg-opacity-30 text-white font-bold transition-transform duration-300 ${direction == 'up' ? 'translate-y-0' : ' -translate-y-full'
        }`}
    >
      {/* Dark overlay effect */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* Navbar content */}
      <div className="relative flex flex-col md:flex-row justify-between items-center px-4 py-3 md:space-y-0">
        {/* Logo and Text Linking to Homepage */}
        <Link to="/" className="flex gap-2 items-center">
          <img src={logo} alt="SG SPOTS" className="h-16 rounded-lg" />
          <h1 className="text-white">
            <span className="text-red-600">SG</span> SPOTS
          </h1>
        </Link>

        {/* Searchbox Component */}
        <Searchbox />

        {/* Navigation Buttons */}
        <div className="flex gap-8 items-center">
          <Link
            to="/login"
            className="inline-flex items-center h-9 px-4 py-2 text-white font-bold rounded-xl border border-white hover:bg-white hover:text-black"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="inline-flex items-center h-9 px-4 py-2 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

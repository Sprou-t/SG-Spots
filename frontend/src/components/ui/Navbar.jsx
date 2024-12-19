import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/navbarImages/borders-2099224.svg";
import Searchbox from './Searchbox.jsx';
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = ({ openModal }) => {
  const oldScrollY = useRef(window.scrollY);
  const navbarRef = useRef(null)
  const [direction, setDirection] = useState('up');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu

  const controlDirection = () => {
    if (window.scrollY > oldScrollY.current) {
      setDirection('down');
    } else {
      setDirection('up');
    }
    setIsMenuOpen(false);
    oldScrollY.current = window.scrollY;
  };

  const handleClickOutside = (event) => {
    // if current navbarRef is not null(user clicked on sth) && current ref does not contain target(user clicks outside)
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setIsMenuOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', controlDirection, true);
    document.addEventListener('click', handleClickOutside)
    return () => {
      window.removeEventListener('scroll', controlDirection, true);
      document.removeEventListener('click', handleClickOutside)
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      ref={navbarRef}
      className={`md:hover:bg-white md:hover:text-black  text-black md:text-white group z-50 fixed top-0 w-full md:bg-transparent bg-white backdrop-filter  font-bold transition-transform duration-300 ${direction === 'up' ? 'translate-y-0' : '-translate-y-full'
        }`}
    >
      <div className="relative flex justify-between items-center px-4 py-1">
        {/* Logo */}
        <Link to="/home" className="flex gap-2 items-center">
          <img src={logo} alt="SG SPOTS" className="h-16 rounded-lg" />
          <h1 className="md:text-white md:group-hover:text-black">
            <span className="text-red-600">SG</span> SPOTS
          </h1>
        </Link>

        {/* Hamburger Menu Toggle Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex items-center  focus:outline-none"
        >
          <GiHamburgerMenu />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          <Searchbox />
          <button
            onClick={() => openModal('login')}
            className="group-hover:text-black inline-flex items-center justify-center h-9 px-4 py-2  font-bold"
          >
            Log In
          </button>
          <button
            onClick={() => openModal('signUp')}
            className="group-hover:text-black inline-flex items-center justify-center h-9 px-4 py-2  font-bold rounded-xl"
          >
            Sign Up
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full hover:text-black bg-white shadow-md flex flex-col items-center gap-4 py-4 md:hidden">
            <Searchbox />
            <button
              onClick={() => openModal('login')}
              className="w-full text-center py-2   font-bold"
            >
              Log In
            </button>
            <button
              onClick={() => openModal('signUp')}
              className="w-full text-center py-2  font-bold"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

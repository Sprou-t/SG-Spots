import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/navbarImages/borders-2099224.svg";
import Searchbox from './Searchbox.jsx';
import Modal from './Modal.jsx'; // Import Modal for login/signup

const Navbar = ({ openModal }) => {
  const oldScrollY = useRef(window.scrollY); // Retains scroll position between renders
  const [direction, setDirection] = useState('up'); // Default direction is up

  // Handle scroll direction
  const controlDirection = () => {
    if (window.scrollY > oldScrollY.current) {
      setDirection('down');
    } else {
      setDirection('up');
    }
    oldScrollY.current = window.scrollY;
  };

  // Adding event listener for scroll
  useEffect(() => {
    window.addEventListener('scroll', controlDirection, true);

    return () => {
      window.removeEventListener('scroll', controlDirection, true); // Cleanup on unmount
    };
  }, []);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  // Functions to open and close modals
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  const openSignUpModal = () => setIsSignUpModalOpen(true);
  const closeSignUpModal = () => setIsSignUpModalOpen(false);

  return (
    <div
      className={`z-50 fixed top-0 w-full bg-transparent backdrop-filter text-white font-bold transition-transform duration-300 ${direction === 'up' ? 'translate-y-0' : ' -translate-y-full'
        }`}
    >
      {/* Dark overlay effect */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      {/* Navbar content */}
      <div className="relative flex flex-col md:flex-row justify-between items-center px-4 py-3 gap-2">
        {/* Logo and Text Linking to Homepage */}
        <Link to="/" className="flex gap-2 items-center md:mr-16">
          <img src={logo} alt="SG SPOTS" className="h-16 rounded-lg" />
          <h1 className="text-white">
            <span className="text-red-600">SG</span> SPOTS
          </h1>
        </Link>

        {/* Searchbox Component */}
        <Searchbox />

        {/* Navigation Buttons */}
        <div className="flex gap-8 md:gap-4">
          <button
            onClick={() => openModal('login')} // Open login modal on click
            className="md:w-24 inline-flex items-center justify-center h-9 px-4 py-2 text-white font-bold rounded-xl border border-white hover:bg-white hover:text-black"
          >
            Log In
          </button>

          <button
            onClick={() => openModal('signUp')} // Open sign-up modal on click
            className="md:w-24 inline-flex items-center justify-center h-9 px-4 py-2 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

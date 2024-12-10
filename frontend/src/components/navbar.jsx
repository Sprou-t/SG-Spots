import React from 'react'
import Searchbox from './searchbox.jsx'
import logo from "../assets/images/borders-2099224.svg"
import { Link } from "react-router-dom";

const Navbar = () => {
  return (

    <div className="fixed scroll-m-0 top-0 font-bold w-screen flex flex-col md:flex-row space-y-2 md:space-y-0 justify-between items-center bg-transparent hover:bg-white">

      {/* Logo and Text Linking to Homepage */}
      <Link to="/" className="flex gap-2 items-center">
        <img src={logo} alt="SG SPOTS" className="h-16 rounded-lg" />
        <span>SG SPOTS</span>
      </Link>

      {/* Searchbox Component */}
      <Searchbox />

      {/* Navigation Buttons */}
      <div className="flex p-8 gap-8 h-16 items-center">

        {/* Log In Button */}
        <Link to="/login" className="h-9 bg-gray-200 text-black font-bold rounded-xl px-4 py-2">
          Log In
        </Link>

        {/* Sign Up Button */}
        <Link to="/signup" className="inline-flex h-9 bg-red-600 text-white font-bold rounded-xl px-4 py-2">
          Sign Up
        </Link>

      </div>
    </div>

  )
}

export default Navbar
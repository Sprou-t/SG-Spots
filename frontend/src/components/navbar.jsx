import React from 'react'
import Searchbox from './searchbox.jsx'
import logo from "../assets/images/borders-2099224.svg"

/* TODO: 1. add animations and effects like the tourism website(when hover it extends + darkens the website) 
2. find a different logo photo */
const Navbar = () => {
  return (
    <div className="h-full w-screen flex flex-col md:flex-row space-y-2 md:space-y-0 justify-between items-center">
      <a className='flex gap-2 items-center'>
        <img src={logo} alt="Description" class=" h-16 rounded-lg" />
        Home
      </a>
      <Searchbox />
      <div className='flex p-8 gap-8 h-16 items-center'>
        <button className='h-9'>Log In</button>
        <button className='inline-flex h-9 bg-red-600 text-white font-bold rounded-xl p-2 text-'>Sign Up</button>
      </div>
    </div>
  )
}

export default Navbar
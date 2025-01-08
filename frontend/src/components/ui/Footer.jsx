import React from 'react'
import { Link } from 'react-router-dom'
import linkedin from '../../assets/footerImages/linkedin-icon-2-logo-svgrepo-com.svg'
import github from '../../assets/footerImages/github-142-svgrepo-com.svg'

/*TODO:
1. add the links in href
*/

const footer = () => {
    return (
        <div className='text-white flex flex-col gap-5 items-center bg-customBlack  p-12 text-center'>
            <Link to='/home' className='text-5xl font-bold'><span className='text-red-600'>SG</span> SPOTS</Link>

            <ul className='flex gap-5'>
                <li>
                    <a>
                        <img src={linkedin} alt="LinkedIn" className='size-10 hover:scale-110' href="https://www.linkedin.com/in/wei-bin-lau-326439239/" target="_blank" rel="noopener noreferrer" />
                    </a>
                </li>
                <li>
                    <a>
                        <img src={github} alt="GitHub" className='size-10 hover:scale-110 bg-white' href="https://github.com/Sprou-t/SG-Spots" target="_blank" rel="noopener noreferrer" />
                    </a>
                </li>
            </ul>

            <ul className='flex gap-7 text-lg font-semibold'>
                <li>
                    <Link to='/blog' className='hover:border-b-2 border-black'>Blog</Link>
                </li>
                <li>
                    <Link to='/about' className='hover:border-b-2 border-black'>About</Link>
                </li>
            </ul>

            <ul className='flex gap-5 text-sm'>
                <li>
                    <Link to='/termsAndConditions' className='hover:border-b-2 border-black'>Terms & Conditions</Link>
                </li>
                <li>
                    <p>•</p>
                </li>
                <li>
                    <Link to='/privacyPolicy' className='hover:border-b-2 border-black'>Privacy Policy</Link>
                </li>
                <li>
                    <p>•</p>
                </li>
                <li>
                    <p>All Rights Reserved</p>
                </li>
            </ul>
        </div >

    )
}

export default footer
import React from 'react'
import { Link } from 'react-router-dom'
import linkedin from '../assets/images/linkedin-icon-2-logo-svgrepo-com.svg'
import github from '../assets/images/github-142-svgrepo-com.svg'
/*TODO:
1. add the links in href*/
const footer = () => {
    return (
        <div className='flex flex-col gap-5 items-center bg-gray-300 w-screen p-12 text-center'>
            <Link className='text-red-600 text-5xl font-bold'>SG<span className='text-black'> SPOTS</span></Link>

            <ul className='flex gap-5'>
                <li>
                    <a>
                        <img src={linkedin} alt="LinkedIn" className='size-10 hover:scale-110' />
                    </a>
                </li>
                <li>
                    <a>
                        <img src={github} alt="GitHub" className='size-10 hover:scale-110' />
                    </a>
                </li>
            </ul>

            <ul className='flex gap-7 text-lg font-semibold'>
                <li>
                    <a className='hover:border-b-2 border-black'>Blog</a>
                </li>
                <li>
                    <a className='hover:border-b-2 border-black'>About</a>
                </li>
            </ul>

            <ul className='flex gap-5 text-sm'>
                <li>
                    <a href='hi' className='hover:border-b-2 border-black'>Terms & Conditions</a>
                </li>
                <li>
                    <p>•</p>
                </li>
                <li>
                    <a className='hover:border-b-2 border-black'>Privacy Policy</a>
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
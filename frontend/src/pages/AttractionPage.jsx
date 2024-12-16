import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { CgWebsite } from "react-icons/cg";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { MdOutlineStarRate } from "react-icons/md";
import { MdAccessTimeFilled } from "react-icons/md";

/* TODO:
1. retrieve info
-multiple images for slideshow
    -count the number of images. (last)
        if there's more than 1, slideshow
        else only display first index 0
-only use 1 db obj
-implement slideshow functionality
-comment section + make icons more colorful
 */

const AttractionPage = () => {
    const [attraction, setAttraction] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:3001/attractions')
            .then(response => {
                setAttraction(response.data[1]);
                console.log("data retrieved successfully")
            })
            .catch(error => {
                console.error('Error fetching attractions:', error);
            });
    }, [])
    console.log(attraction)

    if (attraction != null) {
        return (
            <div className=''>
                <img src={attraction.imageURL[0]} alt="" />
                <div className='w-10/12 mx-auto my-14 gap-10 flex flex-col items-center'>
                    <div className='flex items-center text-3xl gap-3 justify-center gray-800'>
                        <h2>{attraction.title}</h2>
                        <CgWebsite />
                    </div>
                    <div className='flex gap-10 text-xl justify-center  border-2 w-8/12 p-4'>
                        <div>
                            <div className='flex items-center'>
                                <MdOutlineStarRate />
                                <p>Rating: <span className='font-bold gray-800'>{attraction.rating}</span></p>
                            </div>
                            <div className='flex items-center'>
                                <RiMoneyDollarCircleFill />
                                <p>Price <span className='font-bold gray-800'>{attraction.pricing}</span></p>
                            </div>
                        </div>
                        <div>
                            <div className='flex items-center'>
                                <MdAccessTimeFilled />
                                <p className='font-bold gray-800'>{attraction.openingTime} - {attraction.closingTime}</p>
                            </div>
                            <div className='flex items-center'>
                                <FaLocationDot />
                                <p className='font-bold gray-800'> {attraction.address}</p>
                            </div>
                        </div>
                    </div>
                    <p className='text-lg w-10/12'>{attraction.description}</p>
                </div >


            </div >
        )
    }


}

export default AttractionPage
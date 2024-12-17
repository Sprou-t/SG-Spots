import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { CgWebsite } from "react-icons/cg";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { MdOutlineStarRate } from "react-icons/md";
import { MdAccessTimeFilled } from "react-icons/md";
import Carousel from '../features/Carousell.jsx';
import CommentSection from '../components/CommentSection.jsx';

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
                setAttraction(response.data[0]);
                console.log("data retrieved successfully")
            })
            .catch(error => {
                console.error('Error fetching attractions:', error);
            });
    }, [])
    console.log(attraction)
    // count the number of images

    if (attraction != null) {
        const imageCounter = attraction.imageURL.length
        if (imageCounter == 1) {
            return (
                <div>
                    <img src={attraction.imageURL[0]} alt="" />
                    <div className='w-10/12 mx-auto my-14 gap-10 flex flex-col '>
                        <div className='flex items-center text-4xl font-semibold text-gray-600 gap-6 justify-center gray-800'>
                            <h2>{attraction.title}</h2>
                            <CgWebsite />
                        </div>
                        <div className='flex gap-16 text-xl justify-center  border-2  p-10'>
                            <div className='flex-col gap-6 flex'>
                                <div className='flex '>
                                    <MdOutlineStarRate className='mr-1' />
                                    <div className='ml-5'>Rating: <span className='font-bold text-gray-600'>{attraction.rating}</span></div>
                                </div>
                                <div className='flex items-center'>
                                    <RiMoneyDollarCircleFill />
                                    <p>Price <span className='font-bold text-gray-600'>{attraction.pricing}</span></p>
                                </div>
                            </div>
                            <div className='flex-col gap-6 flex'>
                                <div className='flex items-center'>
                                    <MdAccessTimeFilled />
                                    <p className='font-bold text-gray-600'>{attraction.openingTime} - {attraction.closingTime}</p>
                                </div>
                                <div className='flex items-center'>
                                    <FaLocationDot />
                                    <p className='font-bold text-gray-600'> {attraction.address}</p>
                                </div>
                            </div>
                        </div>
                        <p className='text-lg w-7/12 leading-relaxed'>{attraction.description}</p>
                        <CommentSection />
                    </div >
                </div >
            )
        } else if (imageCounter > 1) {
            return (
                <div>
                    <Carousel images={attraction.imageURL} />
                    <div className='w-10/12 mx-auto my-14 gap-10 flex flex-col items-center'>
                        <div className='flex items-center text-4xl font-semibold text-gray-600 gap-6 justify-center gray-800'>
                            <h2>{attraction.title}</h2>
                            <CgWebsite />
                        </div>
                        <div className='flex gap-16 text-xl justify-center  border-2  p-10'>
                            <div className='flex-col gap-6 flex'>
                                <div className='flex items-center gap-1'>
                                    <MdOutlineStarRate />
                                    <p>Rating: <span className='font-bold text-gray-600'>{attraction.rating}</span></p>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <RiMoneyDollarCircleFill />
                                    <p>Price <span className='font-bold text-gray-600'>{attraction.pricing}</span></p>
                                </div>
                            </div>
                            <div className='flex-col gap-6 flex'>
                                <div className='flex items-center gap-1'>
                                    <MdAccessTimeFilled />
                                    <p className='font-bold text-gray-600'>{attraction.openingTime} - {attraction.closingTime}</p>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <FaLocationDot />
                                    <p className='font-bold text-gray-600'> {attraction.address}</p>
                                </div>
                            </div>
                        </div>
                        <p className='text-lg w-7/12 leading-relaxed'>{attraction.description}</p>
                        <CommentSection />
                    </div >


                </div >
            )
        }
    }
}

export default AttractionPage
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { CgWebsite } from "react-icons/cg";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { MdOutlineStarRate } from "react-icons/md";
import { MdAccessTimeFilled } from "react-icons/md";
import Carousel from '../components/animation/Carousell.jsx';
import CommentSection from '../components/ui/CommentSection.jsx';
import { useParams } from 'react-router-dom';

/* TODO:
-comment section + make icons more colorful
 */

const AttractionPage = () => {
    const { id } = useParams()
    const [attraction, setAttraction] = useState(null)

    useEffect(() => {
        axios.get(`http://localhost:3001/attractions/${id}`)
            .then(response => {
                setAttraction(response.data);
                console.log("data retrieved successfully")
            })
            .catch(error => {
                console.error('Error fetching attractions:', error);
            });
    }, [])
    // console.log(attraction)

    if (attraction != null) {
        const imageCounter = attraction.imageURL.length
        return (
            <div>
                {imageCounter > 1 ? <Carousel images={attraction.imageURL} /> : <img src={attraction.imageURL[0]} alt="" />}
                <div className='w-10/12 mx-auto my-14 gap-10 flex flex-col items-center'>
                    <div className='flex items-center text-4xl font-semibold text-gray-600 gap-6 justify-center gray-800'>
                        <h2>{attraction.title}</h2>
                        <CgWebsite />
                    </div>
                    <div className='md:flex gap-16 text-xl justify-center  border-2 xs:p-2 md:p-10'>
                        <div className='flex-col gap-6 flex mb-6 md:mb-0'>
                            <div className='flex items-center gap-3'>
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
                    <a href={attraction.website} target="_blank" rel="noopener noreferrer">
                        Find out more
                    </a>
                    <CommentSection />
                </div >


            </div >
        )
    }
}


export default AttractionPage
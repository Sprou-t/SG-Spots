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
-style it based on the examples
-NEED TO CHANGE THE FIXED H AND MT okkkkkk
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
                {/*structure:
            -image slideshow
            (info in a box w icons make nice nice)
            -title 
            -rating
            -price
            -timing
            -address
            -website
            -description*/}
                <img src={attraction.imageURL[0]} alt="" />
                <div>
                    <h2>{attraction.title}</h2>
                    <CgWebsite />
                    <div>
                        <div>
                            <MdOutlineStarRate />
                            <p>Rating <span>{attraction.rating}</span></p>
                        </div>
                        <div>
                            <RiMoneyDollarCircleFill />
                            <p>Price <span></span></p>
                        </div>
                        <div>
                            <MdAccessTimeFilled />
                            <p></p>
                        </div>
                        <div>
                            <FaLocationDot />
                            <p>Address </p>
                        </div>
                    </div>
                </div>
                <p>{attraction.description}</p>

            </div >
        )
    }


}

export default AttractionPage
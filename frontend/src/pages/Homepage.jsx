import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PropsContext } from '../context/context.props.jsx';
import { FaStar } from 'react-icons/fa'; // Importing the icons
import { BsHouse } from "react-icons/bs"; // accomo
import { MdOutlineAttractions } from 'react-icons/md'; //atractions
import { GiJourney } from 'react-icons/gi'; //tour
import { GiPathDistance } from "react-icons/gi";
import { IoCalendarClearOutline } from "react-icons/io5"; //event
import { MdOutlineFastfood } from "react-icons/md"; //food
import { FaShop } from 'react-icons/fa6'; //shop
import { TiTickOutline } from "react-icons/ti";
import { RxCrossCircled } from "react-icons/rx";
import { TbFilterCog } from "react-icons/tb";

/*TODO  
1. extend: 6 categories + select all + remove all + filter
    - do design first
    - settle the conditional rendering 
the category will dictate what shows up in events
2. searchbar when clicked will go to the individual page
3. mobile design: on top: searchbar and all the icons, bottom: explore, login, about and homepage(both parts can hide away) */
const CategoryBar = () => {
    return (
        <div className='flex border-t-2 '>
            <div className='flex gap-4 m-6 justify-between items-center w-4/6 '>
                <button className='flex flex-col items-center'><GiPathDistance className='text-3xl' /><p>Tours</p></button>
                <button className='flex flex-col items-center'><MdOutlineAttractions className='text-3xl' /><p>Attractions</p></button>
                <button className='flex flex-col items-center'><BsHouse className='text-3xl' /><p>Accomodations</p></button>
                <button className='flex flex-col items-center'><IoCalendarClearOutline className='text-3xl' /><p>Events</p></button>
                <button className='flex flex-col items-center'><MdOutlineFastfood className='text-3xl' /><p>Food & Drinks</p></button>
                <button className='flex flex-col items-center'><FaShop className='text-3xl' /><p>Shop</p></button>
            </div>
            <div className='flex  gap-10 my-6 justify-end items-center w-2/6 pr-5'>
                <button className='flex text-customBlack  border-2 p-2 rounded-lg'><p>Select All</p></button>
                <button className='flex  text-red-700 font-semibold p-2 rounded-lg border-2 border-red-600'><p>Remove All</p></button>
                <button className='flex gap-2 items-center text-lg border-2 p-2 rounded-lg'><TbFilterCog /><p>Filters</p></button>
            </div >
        </div>
    );
};

const AttractionCard = ({ attraction, style }) => {
    if (!attraction.images[0]) {
        return null;
    }

    return (
        <div
            className='h-96 w-[320px] flex flex-col rounded-lg bg-white'
            style={style}
        >
            <Link to={`/home/${attraction.id}`} className='block'>
                <div className='overflow-hidden'>
                    <img
                        className='w-full bg-gray-400 h-72 object-cover rounded-lg transition-transform transform hover:scale-105 cursor-pointer'
                        src={attraction.images[0]}
                        alt={attraction.title}
                        loading='lazy'
                    />
                </div>
                <div className='flex flex-col flex-grow'>
                    <h2 className='font-semibold text-lg truncate'>
                        {attraction.name}
                    </h2>
                    <div className='flex flex-col mt-auto text-gray-500'>
                        <p>Type: {attraction.categoryDescription}</p>
                        <p>
                            Price:{' '}
                            <span className='font-semibold text-black'>
                                {attraction.pricing}
                            </span>
                        </p>
                        <div className=' flex gap-2 items-center'>
                            <FaStar className='text-yellow-400 item' />
                            <p>{attraction.rating}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

const Homepage = () => {
    const { attractions, searchQuery, setAttractions } =
        useContext(PropsContext);

    useEffect(() => {
        axios
            .get('http://localhost:3000/TIHData')
            .then((response) => setAttractions(response.data.data))
            .catch((error) => console.log(error));
    }, []);
    console.log('attractions ==> ', attractions);
    // Filter attractions based on the searchQuery
    const filteredAttractions = attractions.filter((attraction) => {
        // Check if the search query matches any relevant field in the attraction data
        return (
            attraction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            attraction.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
        );
    });
    if (!attractions || attractions.length === 0) {
        return <p>Loading...</p>;
    }

    // Row renderer function
    const Row = ({ index, style }) => {
        const attraction = attractions[index];
        return <AttractionCard attraction={attraction} style={style} />;
    };

    return (
        <div className="flex flex-col mt-24">
            <CategoryBar />
            <div className=' mb-20 w-11/12 mx-auto xl:translate-x-4 flex flex-wrap justify-center gap-10'>
                {filteredAttractions.map((attraction) => (
                    <AttractionCard key={attraction.id} attraction={attraction} />
                ))}
            </div>
        </div>
    );
};

export default Homepage;

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PropsContext } from '../context/context.props.jsx';
import { FaStar, FaRegStar } from 'react-icons/fa'; // Importing the icons


/*TODO: follow airbnb: make image prop bigger and words closer, make img border round */
const AttractionCard = ({ attraction, style }) => {
    if (!attraction.images[0]) {
        return null;
    }

    // Function to render stars based on the rating
    const renderRatingStars = (rating) => {
        const fullStars = Math.floor(rating); // Number of full stars
        const halfStar = rating % 1 >= 0.5; // Check if there should be a half star
        const emptyStars = 5 - Math.ceil(rating); // Remaining stars to make 5

        const stars = [];

        // Add full stars
        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={`full-${i}`} className="text-yellow-500 text-xl" />);
        }

        // Add half star if applicable
        if (halfStar) {
            stars.push(<FaStar key="half" className="text-yellow-500 text-xl" style={{ clipPath: 'inset(0 0 0 50%)' }} />);
        }

        // Add empty stars
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-300 text-xl" />);
        }

        return <div className="flex">{stars}</div>; // Use flex to display stars horizontally
    };

    return (
        <div className='h-96 w-[340px] flex flex-col rounded-lg bg-white' style={style}>
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
                        <p>Price: <span className='font-semibold text-black'>{attraction.pricing}</span></p>
                        <div className='mt-1'>
                            {renderRatingStars(attraction.rating)} {/* Render rating stars here */}
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
        <div className=' mb-20 xs:mt-56 md:mt-32 mx-auto xl:translate-x-4 flex flex-wrap justify-center gap-10'>
            {filteredAttractions.map((attraction) => (
                <AttractionCard key={attraction.id} attraction={attraction} />
            ))}
        </div>
    );
};

export default Homepage;
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PropsContext } from '../context/context.props.jsx';
import { FixedSizeList as List } from 'react-window';

/*TODO: follow airbnb: make image prop bigger and words closer, make img border round */
const AttractionCard = ({ attraction }) => {
    // console.log(attraction.id)
    return (
        <div className='xs:w-10/12 border-gray-300 border-solid border-2 flex flex-col gap-4 shadow-lg rounded-lg h-full bg-white'>
            <Link to={`/home/${attraction.id}`} className='block'>
                <div className='overflow-hidden'>
                    <img
                        className='w-full md:max-h-32 lg:max-h-32 xl:max-h-40 object-cover rounded-t-lg transition-transform transform hover:scale-105 cursor-pointer'
                        src={attraction.images[0]}
                        alt={attraction.title}
                        loading='lazy'
                    />
                </div>
                <div className='p-2 text-center flex flex-col flex-grow mb-4'>
                    <h2 className='font-bold text-lg truncate'>
                        {attraction.name}
                    </h2>
                    <div className='flex flex-col gap-2 mt-auto'>
                        <p>Type: {attraction.categoryDescription}</p>
                        <p>Rating: {attraction.rating}</p>
                        <p>Price: {attraction.pricing}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};
const Homepage = () => {
    const { attractions, searchQuery, setAttractions } =
        useContext(PropsContext);
    console.log('attractions ==> ', attractions);

    useEffect(() => {
        axios
            .get('http://localhost:3000/TIHData')
            .then((response) => setAttractions(response.data.data))
            .catch((error) => console.log(error));
    }, []);
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
        <div className='xs:w-full md:w-11/12 xl:w-3/4 mb-20 xs:mt-56 md:mt-32 mx-auto xl:translate-x-4 grid lg:grid-cols-3 md:grid-cols-2 gap-10 place-items-center'>
            {filteredAttractions.map((attraction) => (
                <AttractionCard key={attraction.id} attraction={attraction} />
            ))}
        </div>
    );
};

export default Homepage;

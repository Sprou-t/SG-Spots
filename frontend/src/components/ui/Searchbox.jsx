import React, { useContext, useState } from 'react';
import { PropsContext } from '../../context/context.props.jsx';
import { Link } from 'react-router-dom';

const Searchbox = () => {
    const { attractions, searchQuery, setSearchQuery } =
        useContext(PropsContext);

    let filteredSearchResult;
    // Filter attractions based on the searchQuery
    if (attractions) {
        filteredSearchResult = attractions.filter((attraction) => {
            return attraction.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
        });
    }
    const handleOptionClick = (name) => {
        setSearchQuery(name); // Set the query to the selected result
        setTimeout(() => setSearchQuery(''), 300); // Clear the query after a short delay
    };

    return (
        <div className='relative'>
            <input
                placeholder='Search for events, attractions...'
                type='text'
                className='rounded-xl h-10 border-2 p-3 xs:w-2/5 md:w-80'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Dropdown for filtered search results */}
            {searchQuery && filteredSearchResult.length > 0 && (
                <ul className='absolute left-0 w-full bg-white border border-gray-300 mt-1 rounded-lg shadow-lg max-h-60 overflow-y-auto'>
                    {filteredSearchResult.map((attraction) => (
                        <Link to={`/home/${attraction.id}`}
                            key={attraction.id}
                            className='h-7 px-2 cursor-pointer text-sm hover:bg-gray-200 mt-2 block truncate'
                            onClick={() => {
                                handleOptionClick(attraction.name)
                            }}
                        >
                            {attraction.name}
                        </Link>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Searchbox;

import React, { useContext, useState } from 'react';
import { PropsContext } from '../../context/context.props.jsx';

const Searchbox = () => {
    const { attractions, searchQuery, setSearchQuery } = useContext(PropsContext);

    // Filter attractions based on the searchQuery
    if (attractions) {
        const filteredSearchResult = attractions.filter(attraction => {
            return attraction.name.toLowerCase().includes(searchQuery.toLowerCase());
        });
    }
    

    return (
        <div className="relative">
            <input
                placeholder='Search for events, attractions...'
                type='text'
                className='rounded-xl h-10 border-2 p-3 xs:w-2/5 md:w-80'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Dropdown for filtered search results */}
            {searchQuery && filteredSearchResult.length > 0 && (
                <ul className="absolute left-0 w-full bg-white border border-gray-300 mt-1 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredSearchResult.map((attraction) => (
                        <li
                            key={attraction.id}
                            className="p-2 cursor-pointer hover:bg-gray-200"
                            onClick={() => {
                                setSearchQuery(attraction.title); // Optionally set the query to the selected result
                            }}
                        >
                            {attraction.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Searchbox;

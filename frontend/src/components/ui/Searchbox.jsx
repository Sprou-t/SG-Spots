import React from 'react'
import { useState } from 'react';

const Searchbox = () => {
    const [searchQuery, setSearchQuery] = useState('');
    return (
        <input
            placeholder="Search for events, attractions..."
            type="text"
            className=" rounded-xl h-10 border-2 p-3 xs:w-2/5 md:w-80"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
        />
    );
};


export default Searchbox
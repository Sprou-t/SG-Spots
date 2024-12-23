import React from 'react'

const Searchbox = () => {
    return (
        <input
            placeholder="Search for events, attractions..."
            type="text"
            className=" rounded-xl h-10 border-2 p-3 xs:w-2/5 md:w-80"
        />
    );
};


export default Searchbox
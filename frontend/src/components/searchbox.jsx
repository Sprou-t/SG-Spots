import { GoSearch } from "react-icons/go";
import React from 'react'

const searchbox = () => {
    return (
        <div className="flex items-center p-2 w-full md:w-3/4">
            <input
                placeholder="Search..."
                type="text"
                className="w-full rounded-xl h-10 border-2 p-3 md:w-1/2"
            />
        </div>
    );
};


export default searchbox
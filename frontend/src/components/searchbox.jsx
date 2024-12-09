import { GoSearch } from "react-icons/go";
import React from 'react'

const searchbox = () => {
    return (
        <div className="flex items-center  rounded-lg p-2 max-w-md mx-auto border-2 border-gray-200 gap-2 ">
            <button ><GoSearch /></button>
            <input placeholder="Search..." type="text" className=" rounded-xl w-80 h-8" />
        </div>
    )
}

export default searchbox
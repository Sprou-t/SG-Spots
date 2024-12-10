import { GoSearch } from "react-icons/go";
import React from 'react'

const searchbox = () => {
    return (
        <div className="flex items-center  rounded-lg p-2 max-w-md mx-auto  gap-2 ">
            <input placeholder="Search..." type="text" className=" rounded-xl w-80 h-8 border-2 p-3" />
        </div>
    )
}

export default searchbox
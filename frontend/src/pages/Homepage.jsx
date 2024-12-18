import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AttractionCard = ({ attraction }) => {
    return (
        <div className="xs:w-10/12 border-gray-300 border-solid border-2 flex flex-col gap-4 shadow-lg rounded-lg h-full bg-white">
            <Link to={`/home/${attraction.id}`} className="block">
                <div className="overflow-hidden">
                    <img className="w-full md:max-h-32 lg:max-h-32 xl:max-h-40 object-cover rounded-t-lg transition-transform transform hover:scale-105 cursor-pointer" src={attraction.imageURL[0]} alt={attraction.title} />
                </div>
                <div className="p-2 text-center flex flex-col flex-grow mb-4">
                    <h2 className="font-bold text-lg truncate">{attraction.title}</h2>
                    <div className="flex flex-col gap-2 mt-auto">
                        <p>Type: {attraction.type}</p>
                        <p>Rating: {attraction.rating}</p>
                        <p>{attraction.pricing}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

const Homepage = () => {
    const [attractions, setAttractions] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/attractions')
            .then(response => setAttractions(response.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="xs:w-full md:w-11/12 xl:w-3/4 mb-20 xs:mt-56 md:mt-32 mx-auto xl:translate-x-4 grid lg:grid-cols-3 md:grid-cols-2 gap-10 place-items-center">
            {attractions.map(attraction => (
                <AttractionCard key={attraction.id} attraction={attraction} />
            ))}
        </div>
    );
};

export default Homepage;

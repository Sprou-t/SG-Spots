import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const AttractionCard = ({ attraction }) => {
    return (
        <div className="border-gray-300 border-solid border-2 flex flex-col gap-4  shadow-lg rounded-lg h-full bg-white">
            <div>
                <img className="w-full max-h-72 object-cover rounded-t-lg" src={attraction.imageURL} alt={attraction.title} />
            </div>
            <div className="p-2 text-center flex flex-col flex-grow">
                <h2 className="font-bold text-lg truncate">{attraction.title}</h2>
                <div className="flex flex-col gap-2 mt-auto">
                    <p>Type: {attraction.type}</p>
                    <p>Rating: {attraction.rating}</p>
                    <p>{attraction.pricing}</p>
                </div>
            </div>
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
        <div className="mb-20 mt-32 w-11/12 mx-auto translate-x-10 grid grid-cols-3 gap-10">
            {attractions.map(attraction => (
                <AttractionCard key={attraction.id} attraction={attraction} />
            ))}
        </div>
    );
};

export default Homepage;

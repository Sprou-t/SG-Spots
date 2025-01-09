import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PropsContext } from '../context/context.props.jsx';
import { FaStar } from 'react-icons/fa'; // Importing the icons
import { BsHouse } from 'react-icons/bs'; // accomo
import { MdOutlineAttractions } from 'react-icons/md'; //atractions
import { GiJourney } from 'react-icons/gi'; //tour
import { GiPathDistance } from 'react-icons/gi';
import { IoCalendarClearOutline } from 'react-icons/io5'; //event
import { MdOutlineFastfood } from 'react-icons/md'; //food
import { FaShop } from 'react-icons/fa6'; //shop
import { TiTickOutline } from 'react-icons/ti';
import { RxCrossCircled } from 'react-icons/rx';
import { TbFilterCog } from 'react-icons/tb';

/*TODO  
1. extend: 6 categories + select all + remove all + filter
    - do design first
    - do the filtering
    - settle the conditional rendering 
the category will dictate what shows up in events
2. searchbar when clicked will go to the individual page
3. mobile design: on top: searchbar and all the icons, bottom: explore, login, about and homepage(both parts can hide away) */
const CategoryBar = ({ selectedType, setSelectedType }) => {
    // set selected type
    const handleSelectedTypeSetting = (type) => {
        // check if exist
        setSelectedType((prevSelected) => {
            if (prevSelected.includes(type)) {
                return prevSelected.filter((t) => t != type)
            } else {
                return [...prevSelected, type]
            }
        })
    };
    const isSelected = (type) => selectedType.includes(type);
    console.log('selected type: ', selectedType)
    return (
        <div className='flex border-t-2 '>
            <div className='flex gap-4 m-6 justify-around items-center w-4/6 '>
                <button
                    onClick={() => handleSelectedTypeSetting('tours')}
                    className={`flex flex-col items-center ${isSelected('tours') ? 'border-customBlack border-b-2' : ''}`}
                >
                    <GiPathDistance className='text-3xl' />
                    <p>Tours</p>
                </button>
                <button onClick={() => handleSelectedTypeSetting('attractions')} className={`flex flex-col items-center ${isSelected('attractions') ? 'border-customBlack border-b-2' : ''}`}>
                    <MdOutlineAttractions className='text-3xl' />
                    <p>Attractions</p>
                </button>
                <button onClick={() => handleSelectedTypeSetting('accommodation')} className={`flex flex-col items-center ${isSelected('accommodation') ? 'border-customBlack border-b-2' : ''}`}>
                    <BsHouse className='text-3xl' />
                    <p>Accomodations</p>
                </button>
                <button onClick={() => handleSelectedTypeSetting('events')} className={`flex flex-col items-center ${isSelected('events') ? 'border-customBlack border-b-2' : ''}`}>
                    <IoCalendarClearOutline className='text-3xl' />
                    <p>Events</p>
                </button>
                <button onClick={() => handleSelectedTypeSetting('food_beverages')} className={`flex flex-col items-center  ${isSelected('food_beverages') ? 'border-customBlack border-b-2' : ''}`}>
                    <MdOutlineFastfood className='text-3xl' />
                    <p>Food & Drinks</p>
                </button>
                <button onClick={() => handleSelectedTypeSetting('shops')} className={`flex flex-col items-center ${isSelected('shops') ? 'border-customBlack border-b-2' : ''}`}>
                    <FaShop className='text-3xl' />
                    <p>Shop</p>
                </button>
            </div>
            <div className='flex my-6 gap-6 justify-end items-center w-2/6 pr-20'>
                <button className='flex text-customBlack  border-2 p-2 rounded-lg hover:bg-customBlack hover:text-white active:bg-customBlack active:text-white'>
                    <p>Select All</p>
                </button>
                <button className='flex  text-red-700 p-2 rounded-lg border-2 border-red-600 hover:bg-red-600 hover:text-white active:bg-red-600 active:text-white'>
                    <p>Remove All</p>
                </button>
                <button className='flex gap-2 items-center text-lg border-2 p-2 rounded-lg hover:bg-customBlack hover:text-white active:bg-customBlack active:text-white'>
                    <TbFilterCog />
                    <p>Filters</p>
                </button>
            </div>
        </div >
    );
};

const AttractionCard = ({ attraction, style }) => {
    if (!attraction.images[0]) {
        return null;
    }

    return (
        <div
            className='h-96 w-[320px] flex flex-col rounded-lg bg-white'
            style={style}
        >
            <Link to={`/ home / ${attraction.id}`} className='block'>
                <div className='overflow-hidden'>
                    <img
                        className='w-full bg-gray-400 h-72 object-cover rounded-lg transition-transform transform hover:scale-105 cursor-pointer'
                        src={attraction.images[0]}
                        alt={attraction.title}
                        loading='lazy'
                    />
                </div>
                <div className='flex flex-col flex-grow'>
                    <h2 className='font-semibold text-lg truncate'>
                        {attraction.name}
                    </h2>
                    <div className='flex flex-col mt-auto text-gray-500'>
                        <p>SelectedType: {attraction.categoryDescription}</p>
                        <p>
                            Price:{' '}
                            <span className='font-semibold text-black'>
                                {attraction.pricing}
                            </span>
                        </p>
                        <div className=' flex gap-2 items-center'>
                            <FaStar className='text-yellow-400 item' />
                            <p>{attraction.rating}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

const Homepage = () => {
    const [selectedType, setSelectedType] = useState([
        'accommodation',
        'attractions',
        'events',
        'food_beverages',
        'shops',
        'tours',
    ]);
    const { attractions, searchQuery, setAttractions } = useContext(PropsContext);

    useEffect(() => {
        axios
            .get('http://localhost:3000/TIHData')
            .then((response) => setAttractions(response.data.data))
            .catch((error) => console.log(error));
    }, []);

    // Function to filter by selected categories
    const filterByCategory = (attraction) => {
        console.log("attraction category ==> ", attraction.categoryDescription);
        if (selectedType.length === 0) {
            return false;
        }
        // console.log(selectedType)
        const isMatch = selectedType.find(type => type === attraction.categoryDescription.toLowerCase())
        console.log("isMatch ==> ", isMatch);
        if (isMatch) {
            return true
        }
    };

    // Filter attractions based on search query
    const filterBySearchQuery = (attraction) => {
        return (
            attraction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            attraction.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
        );
    };

    // Combine category filter and search query filter
    console.log("attractions ==> ", attractions);
    const filteredAttractions = attractions
        .filter(filterByCategory)   // Apply category filter
        .filter(filterBySearchQuery);  // Apply search query filter
    console.log('filteredAttractions: ', filteredAttractions)

    if (!attractions || attractions.length === 0) {
        return <p className='mt-96'>Loading...</p>;
    }

    return (
        <div className='flex flex-col mt-24'>
            <CategoryBar
                selectedType={selectedType}
                setSelectedType={setSelectedType}
            />
            <div className='mb-20 w-11/12 mx-auto xl:translate-x-4 flex flex-wrap justify-center gap-10'>
                {filteredAttractions.map((attraction) => (
                    <AttractionCard
                        key={attraction.id}
                        attraction={attraction}
                    />
                ))}
            </div>
        </div>
    );
};


export default Homepage;

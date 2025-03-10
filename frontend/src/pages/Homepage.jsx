import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PropsContext } from '../context/context.props.jsx';
import { FaStar } from 'react-icons/fa';
import { BsHouse } from 'react-icons/bs';
import { MdOutlineAttractions } from 'react-icons/md';
import { GiJourney } from 'react-icons/gi';
import { GiPathDistance } from 'react-icons/gi';
import { IoCalendarClearOutline } from 'react-icons/io5';
import { MdOutlineFastfood } from 'react-icons/md';
import { FaShop } from 'react-icons/fa6';
import { TbFilterCog } from 'react-icons/tb';
import fallBackImage from '../assets/homepageImages/pexels-stijn-dijkstra-1306815-2499786.jpg'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';


const CategoryBar = ({ selectedType, setSelectedType, handleSelectAll, handleRemoveAll, handleSortChange, dropdownRef, isDropdownOpen, setDropdownOpen }) => {
    const [selectedSort, setSelectedSort] = useState('none');
    const [scrollPosition, setScrollPosition] = useState(0);
    const containerRef = useRef(null); // Reference to the scrollable container

    // Check scroll position on scroll
    const handleSelectedTypeSetting = (type) => {
        setSelectedType((prevSelected) =>
            prevSelected.includes(type)
                ? prevSelected.filter((t) => t !== type)
                : [...prevSelected, type]
        );
    };

    const isSelected = (type) => selectedType.includes(type);

    const handleSortOptionClick = (option) => {
        setSelectedSort(option); // Update selected sort
        handleSortChange({ target: { value: option } }); // Trigger sort change
        setDropdownOpen(false); // Close dropdown
    };

    // Track scroll position
    const handleScroll = () => {
        if (containerRef.current) {
            setScrollPosition(containerRef.current.scrollLeft);
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        container.addEventListener('scroll', handleScroll);
        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Calculate gradient mask dynamically based on scroll position
    const calculateMaskGradient = () => {
        const container = containerRef.current;
        if (container) {
            const scrollMax = container.scrollWidth - container.clientWidth;
            const remainingLeft = scrollPosition;
            const remainingRight = scrollMax - scrollPosition;

            // Apply a gradient only if there is remaining content to scroll
            if (remainingLeft === 0) {
                return 'linear-gradient(to right, transparent, black 0px, black calc(100% - 100px), transparent)';
            } else if (remainingRight <= 0) {
                return 'none'; // No blur on the right side when at the end
            }
            return 'linear-gradient(to right, transparent, black 64px, black calc(100% - 64px), transparent)';
        }
        return 'none'; // Default to no mask if no container found
    };

    return (
        <div className='border-t-gray-300 flex border-t-2 gap-6 md:text-sm justify-around no-scrollbar overflow-x-auto xs:max-w-80 xsm:max-w-[768px] md:max-w-[1024px] lg:max-w-[1439px] lg:pl-10  2xl:max-w-[2560px] md:w-full mx-auto md:mx-0'>
            <div
                ref={containerRef}
                className='flex gap-4  my-6 md:justify-around items-center w-full pl-2 lg:gap-7'
            >
                <button
                    key="tours"
                    onClick={() => handleSelectedTypeSetting('tours')}
                    className={`flex flex-col items-center ${isSelected('tours') ? 'border-customBlack border-b-2' : ''}`}
                >
                    <GiPathDistance className='text-3xl' />
                    <p>Tours</p>
                </button>
                <button
                    onClick={() => handleSelectedTypeSetting('attractions')}
                    className={`flex flex-col items-center ${isSelected('attractions') ? 'border-customBlack border-b-2' : ''}`}
                >
                    <MdOutlineAttractions className='text-3xl' />
                    <p>Attractions</p>
                </button>
                <button
                    onClick={() => handleSelectedTypeSetting('accommodation')}
                    className={`flex flex-col items-center ${isSelected('accommodation') ? 'border-customBlack border-b-2' : ''}`}
                >
                    <BsHouse className='text-3xl' />
                    <p>Accommodations</p>
                </button>
                <button
                    onClick={() => handleSelectedTypeSetting('events')}
                    className={`flex flex-col items-center ${isSelected('events') ? 'border-customBlack border-b-2' : ''}`}
                >
                    <IoCalendarClearOutline className='text-3xl' />
                    <p>Events</p>
                </button>
                <button
                    onClick={() => handleSelectedTypeSetting('food_beverages')}
                    className={`flex flex-col min-w-28 items-center ${isSelected('food_beverages') ? 'border-customBlack border-b-2' : ''}`}
                >
                    <MdOutlineFastfood className='text-3xl' />
                    <p>Food & Drinks</p>
                </button>
                <button
                    onClick={() => handleSelectedTypeSetting('shops')}
                    className={`flex flex-col items-center ${isSelected('shops') ? 'border-customBlack border-b-2' : ''}`}
                >
                    <FaShop className='text-3xl' />
                    <p>Shop</p>
                </button>
            </div>

            <div className='flex my-6 justify-between items-center w-full gap-4 ml-5  xsm:ml-0  mr-2 lg:justify-around'>
                <button
                    onClick={handleSelectAll}
                    className='justify-center w-24 flex text-customBlack border-2 p-2 rounded-lg hover:bg-customBlack hover:text-white active:bg-customBlack active:text-white'
                >
                    <p>Select All</p>
                </button>
                <button
                    onClick={handleRemoveAll}
                    className='md:w-24 justify-center flex text-red-700 p-2 rounded-lg border-2 border-red-600 hover:bg-red-600 hover:text-white active:bg-red-600 active:text-white'
                >
                    <p>Remove All</p>
                </button>
                <div className='relative ' ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen((prev) => !prev)}
                        className='flex flex-col gap-2 items-center border-2 p-2 rounded-lg hover:bg-customBlack hover:text-white active:bg-customBlack active:text-white'
                    >
                        <p>Arrange</p>
                    </button>

                    {isDropdownOpen && (
                        <div className='absolute top-12 -left-1 bg-white border rounded-lg p-2 shadow-lg'>
                            {['none', 'alphabet', 'rating'].map((option) => (
                                <div
                                    key={option}
                                    onClick={() => handleSortOptionClick(option)}
                                    className={`text-center p-2 rounded-lg cursor-pointer hover:bg-gray-200 ${selectedSort === option ? 'bg-gray-100' : ''}`}
                                >
                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

};





const AttractionCard = ({ attraction }) => {
    if (!attraction.images[0]) {
        return null;
    }

    const handleImageError = (event) => {
        event.target.src = fallBackImage; // Set fallback image when an error occurs
    };

    return (
        <div className='h-96 w-[300px] flex flex-col rounded-lg bg-white'>
            <Link to={`/home/${attraction.id}`} className='block'>
                <div className='overflow-hidden'>
                    <img
                        className='w-full bg-gray-400 h-72 object-cover rounded-lg transition-transform transform hover:scale-105 cursor-pointer'
                        src={attraction.images[0]}
                        alt={attraction.title}
                        loading='lazy'
                        onError={handleImageError}
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
    const [sortBy, setSortBy] = useState('none'); // To store selected sort method
    const { attractions, searchQuery, setAttractions } = useContext(PropsContext);
    const dropdownRef = useRef(null);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const baseUrl = import.meta.env.VITE_AWS_DEPLOYMENT_URL;
    console.log("baseUrl ==> ", baseUrl);

    const requestTihDataUrl = `${baseUrl}/TIHData`
    console.log("requestTihDataUrl ==> ", requestTihDataUrl);
    useEffect(() => {
        axios
            .get(requestTihDataUrl)
            .then((response) => setAttractions(response.data.data))
            .catch((error) => console.log(error));
    }, []);

    console.log('attraction:', attractions)
    useEffect(() => {
        console.log('homepage rendering')
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        const handleScroll = () => {
            setDropdownOpen(false);
        };

        document.addEventListener('click', handleClickOutside);
        window.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('click', handleClickOutside);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const filterByCategory = (attraction) => {
        if (selectedType.length === 0) {
            return false;
        }
        return selectedType.includes(attraction.categoryDescription.toLowerCase());
    };

    const filterBySearchQuery = (attraction) => {
        return (
            attraction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            attraction.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    // Combine category filter and search query filter
    const filteredAttractions = attractions
        .filter(filterByCategory)  // Apply category filter
        .filter(filterBySearchQuery);  // Apply search query filter

    // Function to sort by Alphabet
    const sortAlphabetically = (a, b) => a.name.localeCompare(b.name);

    // Function to sort by Rating
    const sortByRating = (a, b) => b.rating - a.rating;

    // Apply sorting based on selected sort method
    const sortedAttractions = () => {
        switch (sortBy) {
            case 'alphabet':
                return filteredAttractions.sort(sortAlphabetically);
            case 'rating':
                return filteredAttractions.sort(sortByRating);
            default:
                return filteredAttractions;
        }
    };

    const handleSelectAll = () => {
        setSelectedType([
            'accommodation',
            'attractions',
            'events',
            'food_beverages',
            'shops',
            'tours',
        ]);
    };

    const handleRemoveAll = () => {
        setSelectedType([]);
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    if (!attractions || attractions.length === 0) {
        return <p className='mt-96'>Loading...</p>;
    }

    return (

        <div className='flex flex-col w-full mt-24'>
            <CategoryBar
                handleSelectAll={handleSelectAll}
                handleRemoveAll={handleRemoveAll}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                handleSortChange={handleSortChange}
                dropdownRef={dropdownRef}
                isDropdownOpen={isDropdownOpen}
                setDropdownOpen={setDropdownOpen}
            />
            <div className='grid grid-cols-1 xsm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 mb-20 w-11/12 mx-auto justify-center place-items-center gap-10'>
                {sortedAttractions().map((attraction) => (
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

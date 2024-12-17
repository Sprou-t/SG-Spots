import React, { useState, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Carousel = ({ images, autoSlide = true, autoSlideInterval = 5000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (autoSlide) {
            const slideInterval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            }, autoSlideInterval);
            return () => clearInterval(slideInterval);
        }
    }, [autoSlide, autoSlideInterval, images.length]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="object-cover m-0 w-full">
            <div className="overflow-hidden relative h-screen w-full">
                {images.map((image, index) => {
                    const isActive = index === currentIndex;

                    return (
                        <div
                            key={index}
                            className={`absolute inset-0 w-full h-full transition-all duration-[2000ms]  ease-in-out ${isActive ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-90'}`}
                        >
                            <img src={image} alt={`Slide ${index}`} className="w-full h-full object-cover" />
                        </div>
                    );
                })}
            </div>

            {/* Previous Button */}
            <button
                className=" z-20 absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-900 bg-opacity-50 text-white p-2 rounded-full hover:scale-110 transition-all"
                onClick={prevSlide}
            >
                <IoIosArrowBack className="text-4xl" />
            </button>

            {/* Next Button */}
            <button
                className=" z-20 absolute top-1/2 right-0 transform -translate-y-1/2 -translate-x-1/3 bg-gray-900 bg-opacity-50 text-white p-2 rounded-full hover:scale-110 transition-all"
                onClick={nextSlide}
            >
                <IoIosArrowForward className="text-4xl" />
            </button>
        </div>
    );
};

export default Carousel;

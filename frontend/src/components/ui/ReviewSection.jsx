import React, { useEffect, useState } from 'react';
import axios from 'axios';

/*TODO
-create layout design for comment sections
-follow design shown in gkeep */

const ReviewCard = ({ review }) => {
    console.log('review card rendered')
    const { name, date, stars, description, image } = review;

    // Format the date to a readable format
    const formattedDate = new Date(date).toLocaleDateString();

    return (
        <div className="border-b-2 py-4">
            {/* Review Header with Name and Date */}
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <h3 className="text-xl font-semibold">{name}</h3>
                    <span className="ml-2 text-gray-500">{formattedDate}</span>
                </div>

                {/* Render stars */}
                <div className="flex">
                    {[...Array(5)].map((_, index) => (
                        <span key={index} className={index < stars ? "text-yellow-500" : "text-gray-300"}>
                            &#9733;
                        </span>
                    ))}
                </div>
            </div>

            {/* Review Description */}
            <p className="mt-2 text-gray-700">{description}</p>

            {/* Conditionally render an image if available */}
            {image && (
                <div className="mt-4">
                    <img src={image} alt="Review Image" className="w-full h-auto rounded-md" />
                </div>
            )}
        </div>
    );
};


const ReviewSection = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        axios
            .get('http://localhost:3001/attractions')
            .then((response) => {
                setReviews(response.data[0].reviews);
            })
            .catch((err) => console.log(`error in fetching reviews: ${err} `));
    }, []);

    console.log('review data:', reviews);
    return (

        <div className='mt-10 w-11/12 p-2'>
            <h2 className='text-4xl '>Reviews</h2>
            {reviews.map((review, index) => (
                <ReviewCard key={index} review={review} />
            ))}
        </div>

    );
};

export default ReviewSection;

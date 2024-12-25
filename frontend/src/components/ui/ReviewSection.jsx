import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { GoPaperclip } from 'react-icons/go';
import { useFormStatus } from 'react-dom';
import Modal from './AuthModal.jsx';
import AddReview from './ReviewForm.jsx';
import { PropsContext } from './../../context/context.props.jsx';

const ReviewCard = ({ review }) => {
	console.log('review card rendered');
	const { name, date, stars, description, image } = review;

	// Format the date to a readable format
	const formattedDate = new Date(date).toLocaleDateString();

	return (
		<div className='border-b-2 py-4'>
			{/* Review Header with Name and Date */}
			<div className='flex items-center justify-between'>
				<div className='flex items-center'>
					<h3 className='text-xl font-semibold'>{name}</h3>
					<span className='ml-2 text-gray-500'>{formattedDate}</span>
				</div>

				{/* Render stars */}
				<div className='flex'>
					{[...Array(5)].map((_, index) => (
						<span
							key={index}
							className={
								index < stars
									? 'text-yellow-500'
									: 'text-gray-300'
							}
						>
							&#9733;
						</span>
					))}
				</div>
			</div>

			{/* Review Description */}
			<p className='mt-2 text-gray-700'>{description}</p>

			{/* Conditionally render an image if available */}
			{image && (
				<div className='mt-4'>
					<img
						src={image}
						alt='Review Image'
						className='w-full h-auto rounded-md'
					/>
				</div>
			)}
		</div>
	);
};

const ReviewSection = ({ id }) => {
	const [reviews, setReviews] = useState([]);
	const [averageRating, setAverageRating] = useState(0);
	const { openModal } = useContext(PropsContext);

	useEffect(() => {
		axios
			.get(`http://localhost:3000/api/${id}`)
			.then((response) => {
				console.log('response ==> ', response);

				const fetchedReviews = response.data.attractionData.reviews;
				setReviews(fetchedReviews);

				// Calculate the average rating
				const totalStars = fetchedReviews.reduce(
					(acc, review) => acc + review.stars,
					0
				);
				const avg = fetchedReviews.length
					? totalStars / fetchedReviews.length
					: 0;
				setAverageRating(avg.toFixed(1)); // Round to 1 decimal place
			})
			.catch((err) => console.log(`error in fetching reviews: ${err} `));
	}, []);

	const openReviewForm = () => {
		openModal({ type: 'review', title: null });
	};

	return (
		<div className='mt-10 w-11/12 p-2'>
			<h2 className='text-4xl border-b-2'>Reviews</h2>

			{/* Average Rating Section */}
			<div className='my-6'>
				<h3 className='text-2xl font-bold mb-2'>Average Rating</h3>
				<div className='flex items-center'>
					{/* Render stars */}
					<div className='flex '>
						{[...Array(5)].map((_, index) => (
							<span
								key={index}
								className={`
                                    ${
										index < Math.round(averageRating)
											? 'text-yellow-500'
											: 'text-gray-300'
									}
                                        text-3xl
                                `}
							>
								&#9733;
							</span>
						))}
					</div>
					<span className='ml-2 text-2xl text-gray-700'>
						{averageRating} / 5
					</span>
				</div>
			</div>

			<div className='flex flex-col p-4 mx-auto mt-2'>
				<button
					type='button'
					onClick={() => openReviewForm()}
					className='bg-blue-500 text-white text-lg font-bold  h-12 rounded-md hover:scale-105'
				>
					Write a Review
				</button>

				{reviews.map((review, index) => (
					<ReviewCard key={index} review={review} />
				))}
			</div>
		</div>
	);
};

export default ReviewSection;

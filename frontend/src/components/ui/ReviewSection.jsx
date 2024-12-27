import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { GoPaperclip } from 'react-icons/go';
import { useFormStatus } from 'react-dom';
import Modal from './AuthModal.jsx';
import AddReview from './ReviewForm.jsx';
import { PropsContext } from './../../context/context.props.jsx';
import review from '../../../../backend/models/models.review.js';

const ReviewCard = ({ review }) => {
	console.log(' review ==> ', review);
	const { authorId, updatedAt, rating, description,image } = review;
	const username = authorId.username;

	// Format the date to a readable format
	const formattedDate = new Date(updatedAt).toLocaleDateString();

	return (
		<div className='border-b-2 py-4'>
			{/* Review Header with Name and Date */}
			<div className='flex items-center justify-between'>
				<div className='flex items-center'>
					<h3 className='text-xl font-semibold'>{username}</h3>
					<span className='ml-2 text-gray-500'>{formattedDate}</span>
				</div>

				{/* Render stars */}
				<div className='flex'>
					{[...Array(5)].map((_, index) => (
						<span
							key={index}
							className={
								index < rating
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

const ReviewSection = ({ id, reviews }) => {
	const [averageRating, setAverageRating] = useState(0);
	const { openModal } = useContext(PropsContext);

	useEffect(() => {
		// Calculate the average rating
		const totalStars = reviews.reduce(
			(acc, review) => acc + review.rating,
			0
		);
		console.log('total stars: ', totalStars);
		const avg = reviews.length ? totalStars / reviews.length : 0;
		setAverageRating(avg.toFixed(1)); // Round to 1 decimal place
	});

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

import React, { useContext, useEffect, useState, useRef } from 'react';
import { PropsContext } from './../../context/context.props.jsx';
import { HiDotsVertical } from 'react-icons/hi';
import { deleteReview } from '../../services/services.review.js';




const ReviewCard = ({ review, setReviewList, openModal, setAverageRating }) => {
	const [imagePath, setImagePath] = useState('');
	let currentUserId;
	if (window.localStorage.getItem('loggedInUser')) {
		currentUserId = JSON.parse(
			window.localStorage.getItem('loggedInUser')
		).userId;
	}
	// console.log(currentUserId);
	const { _id, authorId, updatedAt, rating, description, image } = review;
	// console.log("image ==> ", image);
	// console.log('image content type ==> ', image.mimeType);
	// console.log('image buffer ==>', image.buffer);




	const assignImagePath = () => {
		if (image && image.mimeType && image.buffer) {
			setImagePath(`data:${image.mimeType};base64,${image.buffer}`);
		}
	};
	useEffect(() => {
		assignImagePath();
	}, [review]);
	// console.log('img path: ', imagePath);
	const username = authorId.username;




	// Dropdown state
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useRef(null);




	// Format the date to a readable format
	const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
	const formattedDate = new Date(updatedAt).toLocaleDateString(
		'en-GB',
		options
	);




	// Toggle the dropdown menu
	const toggleDropdown = () => setDropdownOpen(!dropdownOpen);




	// Handle actions
	const handleEdit = () => {
		openModal({ type: 'review', title: 'edit', reviewId: _id });
		console.log('Edit clicked for review:', review._id);
		setDropdownOpen((prevState) => !prevState);
	};




	const handleDelete = async () => {
		await deleteReview(_id);
		setReviewList((prev) => {
			const updatedReviews = prev.filter((review) => review._id !== _id);




			// Recalculate average rating based on the updated list
			const totalStars = updatedReviews.reduce(
				(acc, review) => acc + review.rating,
				0
			);
			const avg = updatedReviews.length
				? totalStars / updatedReviews.length
				: 0;
			setAverageRating(avg.toFixed(1)); // Update the average rating state




			return updatedReviews; // Return the updated list
		});
	};




	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target)
			) {
				setDropdownOpen(false); // Close the dropdown if clicked outside
			}
		};




		const handleScroll = () => {
			setDropdownOpen(false); // Close dropdown if the user scrolls
		};




		document.addEventListener('click', handleClickOutside);
		window.addEventListener('scroll', handleScroll);




		// Clean up event listeners
		return () => {
			document.removeEventListener('click', handleClickOutside);
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);




	return (
		<div className='border-b-2 py-4 relative'>
			{/* Review Header with Name and Date */}
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-4'>
					<h3 className='text-2xl font-semibold'>{username}</h3>
					<span className='ml-2 text-gray-500 text-lg'>
						{formattedDate}
					</span>
				</div>




				{/* Stars and 3-dots menu */}
				<div className='flex items-center relative gap-5'>
					{/* Render stars */}
					<div className='flex'>
						{[...Array(5)].map((_, index) => (
							<span
								key={index}
								className={` text-2xl ${index < rating
									? 'text-yellow-500'
									: 'text-gray-300'
									}`}
							>
								&#9733;
							</span>
						))}
					</div>




					{/* 3-dots menu */}
					{currentUserId === authorId._id && (
						<div className='ml-4' ref={dropdownRef}>
							<button
								className='text-gray-500 hover:text-gray-800 flex items-center'
								onClick={toggleDropdown}
							>
								<HiDotsVertical className='size-6' />
							</button>
							{/* Dropdown menu */}
							{dropdownOpen && (
								<div className='absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md'>
									<button
										className='block w-full px-4 py-2 text-left hover:bg-gray-100'
										onClick={handleEdit}
									>
										Edit
									</button>
									<button
										className='block w-full px-4 py-2 text-left hover:bg-gray-100 text-red-500'
										onClick={handleDelete}
									>
										Delete
									</button>
								</div>
							)}
						</div>
					)}
				</div>
			</div>




			{/* Review Description */}
			<p className='mt-2 text-gray-700'>{description}</p>




			{/* Conditionally render an image if available */}
			{image && imagePath && (
				<div className='mt-4'>
					<img
						src={imagePath}
						alt='Review Image'
						className='size-72 h-auto rounded-md'
					/>
				</div>
			)}
		</div>
	);
};




const ReviewSection = ({ reviews }) => {
	const [reviewList, setReviewList] = useState(null);
	const [averageRating, setAverageRating] = useState(0);
	const { openModal } = useContext(PropsContext);
	const isUserLoggedIn = window.localStorage.getItem('loggedInUser');




	useEffect(() => {
		// console.log('reviews ==> ', reviews);
		// Calculate the average rating
		setReviewList(reviews);
		const totalStars = reviews.reduce(
			(acc, review) => acc + review.rating,
			0
		);
		const avg = reviews.length ? totalStars / reviews.length : 0;
		setAverageRating(avg.toFixed(1)); // Round to 1 decimal place
	}, [reviews]);




	const openReviewForm = () => {
		openModal({ type: 'review', title: 'submit', reviewId: null });
	};




	const openAuthForm = () => {
		openModal({
			type: 'authentication',
			title: 'logIn',
			reviewId: null,
		});
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
                                    ${index < Math.round(averageRating)
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




			<div className='flex flex-col mt-2'>
				{isUserLoggedIn ? (
					<button
						type='button'
						onClick={() => openReviewForm()}
						className='bg-blue-500 text-white text-lg font-bold  h-12 rounded-md hover:scale-105'
					>
						Write a Review
					</button>
				) : (
					<button
						type='button'
						onClick={() => openAuthForm()}
						className='bg-blue-500 text-white text-lg font-bold  h-12 rounded-md hover:scale-105'
					>
						Sign In and Write a Review
					</button>
				)}




				<div className="flex flex-col gap-4">
					{reviewList &&
						reviewList.length > 0 &&
						reviewList.map((review, index) => (
							<ReviewCard
								key={index}
								review={review}
								setReviewList={setReviewList}
								openModal={openModal}
								setAverageRating={setAverageRating}
							/>
						))}
				</div>
			</div>
		</div>
	);
};
export default ReviewSection;

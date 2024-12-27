import React, { useContext } from 'react';
import { useFormStatus } from 'react-dom';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { GoPaperclip } from 'react-icons/go';
import { createReview } from '../../services/services.review.js';
import { PropsContext } from '../../context/context.props.jsx';
import { FaStar } from 'react-icons/fa';

/*TODO: 
1. display review of all review attached to the specific attraction
2. add functionality of attaching pictures */

const ReviewForm = ({ attractionId, handleReviewSubmit }) => {
	const [userReview, setUserReview] = useState('');
	const [rating, setRating] = useState(0);
	const { pending } = useFormStatus();
	const { closeModal } = useContext(PropsContext);

	const submitReview = async (event) => {
		event.preventDefault();
		let newReview;
		try {
			newReview = await createReview({
				rating: rating,
				description: userReview,
				attractionId: attractionId,
			});
		} catch (err) {
			console.error(`error creating review: ${err}`);
		}
		setUserReview('');
		setRating(0);
		closeModal();
		handleReviewSubmit();
		console.log('submitted: ', newReview);
	};

	return (
		<form onSubmit={submitReview} className='p-5 items-center'>
			<div className='flex items-center justify-start my-4 gap-2'>
				{/* Star Rating */}
				<p className='text-2xl'>Rating: </p>
				{[1, 2, 3, 4, 5].map((star) => (
					<FaStar
						key={star}
						className={`cursor-pointer text-3xl ${
							star <= rating ? 'text-yellow-500' : 'text-gray-300'
						}`}
						onClick={() => setRating(star)}
					/>
				))}
			</div>

			<textarea
				rows='4'
				className='my-8 w-full  h-80 mb-4 px-3 py-2 border-2 border-gray-300 rounded-lg outline-none focus:border-blue-300'
				name='comment'
				placeholder='Leave a review'
				value={userReview}
				onChange={(e) => setUserReview(e.target.value)}
			></textarea>

			<div className='flex justify-end gap-4'>
				<button>
					<GoPaperclip className='size-6' type='button' />
				</button>
				<button
					type='submit'
					disabled={pending}
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded max-w-[100px]'
				>
					{pending ? 'Submitting...' : 'Submit'}
				</button>
			</div>
		</form>
	);
};

export default ReviewForm;

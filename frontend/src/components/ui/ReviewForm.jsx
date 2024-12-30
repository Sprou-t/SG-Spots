import React, { useContext } from 'react';
import { useFormStatus } from 'react-dom';
import { useState } from 'react';
import { GoPaperclip } from 'react-icons/go';
import { createReview, updateReview } from '../../services/services.review.js';
import { PropsContext } from '../../context/context.props.jsx';
import { FaStar } from 'react-icons/fa';

/*TODO:
1. display review of all review attached to the specific attraction
2. add functionality of attaching pictures */

// haldleReviewSubmit will make a get req to fetch the attraction data
// again whenever a form is submitted to create or edit a review
const ReviewForm = ({ attractionId, handleReviewSubmit }) => {
	const [userReview, setUserReview] = useState('');
	const [rating, setRating] = useState(0);
	const [file, setFile] = useState(null); // State to store the selected file
	const { pending } = useFormStatus();
	const { modalState, closeModal } = useContext(PropsContext);
	// console.log("modalState ==> ", modalState);

	const reviewId = modalState.reviewId;
	console.log("reviewId ==> ", reviewId);

	const submitReview = async (event) => {
		event.preventDefault();
		let newReview;
		const formData = new FormData(); // inbuilt js function to create form obj
		formData.append('attractionId', attractionId);
		formData.append('rating', rating);
		formData.append('description', userReview);

		if (file) {
			formData.append('avatar', file); // Append the file to formData
		}
		try {
			newReview = await createReview(formData);
		} catch (err) {
			console.error(`error creating review: ${err}`);
		}
		setUserReview('');
		setRating(0);
		setFile(null);
		closeModal();
		handleReviewSubmit();
		console.log('submitted: ', newReview);
	};

	const editReview = async (event) => {
		event.preventDefault();

		// Create an object with the input data
		const updatedReviewData = {
			reviewId,
			attractionId,
			rating,
			description: userReview,
			avatar: file, // This can be null if no file is selected
		};

		try {
			// Pass the input data object to the updateReview function
			const updatedReview = await updateReview(updatedReviewData);

			// Reset state and close modal
			setUserReview('');
			setRating(0);
			setFile(null);
			closeModal();
			handleReviewSubmit();
			console.log('Review edited: ', updatedReview);
		} catch (err) {
			console.error('Error updating review: ', err);
		}
	};



	const handleFileUploadClick = (event) => {
		event.preventDefault();
		document.getElementById('file-input').click(); // Trigger the hidden file input click
	};

	const handleFileChange = (event) => {
		const selectedFile = event.target.files[0];
		if (selectedFile) {
			setFile(selectedFile); // Store the selected file
		}
	};

	return (
		<form
			onSubmit={modalState.title == 'submit' ? submitReview : editReview}
			encType='multipart/form-data'
			className='p-5 items-center'
		>
			<div className='flex items-center justify-start my-4 gap-2'>
				{/* Star Rating */}
				<p className='text-2xl'>Rating: </p>
				{[1, 2, 3, 4, 5].map((star) => (
					<FaStar
						key={star}
						className={`cursor-pointer text-3xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'
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
				{/* Hidden file input element */}
				<input
					type='file'
					name='avatar'
					id='file-input'
					style={{ display: 'none' }} // Hide the file input
					onChange={handleFileChange} // Handle file selection
				/>

				{/* Show the file name if a file is selected */}
				{file && (
					<div
						onChange={handleFileChange}
						className='text-xl font-semibold mt-2 text-blue-600'
					>
						<p>File selected!</p>
					</div>
				)}
				<button>
					<GoPaperclip
						onClick={handleFileUploadClick}
						className='size-6 hover:text-blue-600'
						type='button'
					/>
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

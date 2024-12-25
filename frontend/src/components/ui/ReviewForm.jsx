import React from 'react';
import { useFormStatus } from 'react-dom';
import { useState } from 'react';
import { GoPaperclip } from 'react-icons/go';

const ReviewForm = () => {
    const [userReview, setUserReview] = useState('');
    const { pending } = useFormStatus();

    const submitReview = (event) => {
        console.log('review submitted')
        event.preventDefault();
        const newReview = {
            description: userReview,
        };
    };

	return (
		<form action='' className='p-5 items-center' >
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
                    onClick={submitReview}
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

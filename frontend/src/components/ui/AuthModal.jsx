// Modal.jsx
import React, { useContext } from 'react';
import { PropsContext } from '../../context/context.props.jsx';

const AuthModal = ({ children }) => {
	const { closeModal } = useContext(PropsContext);

	return (
		<div
			className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'
			onClick={closeModal} // Close the modal when clicking outside
		>
			<div
				className='bg-white p-8 rounded-lg md:w-5/12 xl:w-1/3   relative '
				onClick={(e) => e.stopPropagation()} // Prevent closing on click inside the modal
			>
				{/* Close button positioned at the top right corner */}
				<button
					className=' absolute top-6 right-0 text-4xl font-bold text-gray-700 hover:text-red-500 mr-4'
					onClick={closeModal} // Close the modal when clicking the close button
				>
					&times; {/* "X" symbol */}
				</button>

				{/* Add the respective forms */}
				{children}
			</div>
		</div>
	);
};

export default AuthModal;

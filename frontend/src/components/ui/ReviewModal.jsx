// Modal.jsx
import React, { useContext } from 'react';
import { PropsContext } from '../../context/context.props.jsx';

const ReviewModal = ({ children }) => {
    const { closeModal } = useContext(PropsContext);

    return (
        <div
            className='w-full fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 '
            onClick={closeModal} // Close the modal when clicking outside
        >
            <div
                className='bg-white rounded-lg w-full  relative '
                onClick={(e) => e.stopPropagation()} // Prevent closing on click inside the modal
            >
                {/* Close button positioned at the top right corner */}
                <button
                    className=' absolute  right-0 text-4xl font-bold text-gray-700 hover:text-red-500 '
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

export default ReviewModal;

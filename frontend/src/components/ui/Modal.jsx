// Modal.jsx
import React from 'react';
import AuthForm from '../../pages/AuthForm.jsx';

const Modal = ({ isModalOpen, closeModal }) => {
    if (!isModalOpen) return null; // Don't render anything if modal is not open

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={closeModal} // Close the modal when clicking outside
        >
            <div
                className="bg-white p-8 rounded-lg md:w-5/12 relative "
                onClick={(e) => e.stopPropagation()} // Prevent closing on click inside the modal
            >
                { /* Close button positioned at the top right corner */}
                <button
                    className=" absolute top-2 right-2 text-4xl font-bold text-gray-700 hover:text-red-500 mr-4"
                    onClick={closeModal} // Close the modal when clicking the close button
                >
                    &times; {/* "X" symbol */}
                </button>

                { /* Add the respective forms */}
                <AuthForm />
            </div>
        </div>
    );
};

export default Modal

import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage.jsx';
import Landing from './pages/Landing.jsx';
import IndividualPage from './pages/IndividualPage.jsx';
import Navbar from './components/ui/Navbar.jsx';
import Footer from './components/ui/Footer.jsx';
import AuthModal from './components/ui/AuthModal.jsx';
import TermsAndConditions from './pages/TermsAndConditions.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import AboutSGSpots from './pages/About.jsx';
import Blog from './pages/Blog.jsx';
import AuthForm from './components/ui/AuthForm.jsx';
import { PropsContext } from './context/context.props.jsx';

const App = () => {
	const [user, setUser] = useState(null);
	const [attractions, setAttractions] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalState, setModalState] = useState({
		type: null,
		title: null,
		reviewId: null,
	}); // Combined state
	const [notification, setNotification] = useState(null);

	const showNotification = (message, type) => {
		setNotification({ message, type });
		setTimeout(() => setNotification(null), 5000); // Clear notification after 5 seconds
	};

	// Function to open the modal
	// type: authentication/review/notification
	// title: auth(logIn or signUp), review(submit or edit)
	// reviewID: null or give the value
	const openModal = ({ type, title, reviewId }) => {
		setIsModalOpen(true); // Open modal
		setModalState({ type, title, reviewId }); // Update modal state
	};

	// Function to close the modal
	const closeModal = () => {
		setIsModalOpen(false);
		setModalState({ type: null, title: null }); // Reset modal state
		// console.log('modalState after closing', modalState);
	};

	return (
		<PropsContext.Provider
			value={{
				user,
				modalState,
				isModalOpen,
				searchQuery,
				attractions,
				setAttractions,
				setSearchQuery,
				setUser,
				openModal,
				closeModal,
				setModalState,
				showNotification,
			}}
		>
			<div className=' h-full min-w-full'>
				<Navbar />

				{isModalOpen && modalState.type === 'authentication' && (
					<AuthModal>
						<AuthForm />
					</AuthModal>
				)}

				{notification && (
					<div
						className={`fixed bottom-0 left-0 right-0 p-4 text-white ${notification.type === 'error'
							? 'bg-red-500'
							: 'bg-green-500'
							}`}
					>
						<p>{notification.message}</p>
					</div>
				)}

				{/* <TestHomepage /> */}
				<Routes>
					<Route path='/' element={<Landing />} />
					<Route path='/home' element={<Homepage />} />
					<Route path='/home/:id' element={<IndividualPage />} />

					<Route path='/blog' element={<Blog />} />
					<Route path='/privacyPolicy' element={<PrivacyPolicy />} />
					<Route
						path='/termsAndConditions'
						element={<TermsAndConditions />}
					/>
					<Route path='/about' element={<AboutSGSpots />} />
				</Routes>
				<Footer />
			</div>
		</PropsContext.Provider>
	);
};

export default App;

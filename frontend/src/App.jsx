import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage.jsx';
import Landing from './pages/Landing.jsx';
import AttractionPage from './pages/AttractionPage.jsx';
import Navbar from './components/ui/Navbar.jsx';
import Footer from './components/ui/Footer.jsx';
import AuthModal from './components/ui/authModal.jsx';
import ReviewModal from './components/ui/reviewModal.jsx';
import TermsAndConditions from './pages/TermsAndConditions.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import AboutSGSpots from './pages/About.jsx';
import Blog from './pages/Blog.jsx';
import AuthForm from './components/ui/AuthForm.jsx';
import { PropsContext } from './context/context.props.jsx';
import ReviewForm from './components/ui/ReviewForm.jsx';

const App = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalState, setModalState] = useState({ type: null, authType: null }); // Combined state

	useEffect(() => {
		console.log('Updated modal state: ', modalState);
	}, [modalState]);

	// Function to open the modal (Login or SignUp)
	const openModal = ({type, authType}) => {
		setIsModalOpen(true); // Open modal
		setModalState({ type, authType }); // Update modal state
	};

	// Function to close the modal
	const closeModal = () => {
		setIsModalOpen(false);
		setModalState({ type: null, authType: null }); // Reset modal state
		console.log('modalState after clearing', modalState);
	};

	return (
		<PropsContext.Provider
			value={{ modalState, openModal, closeModal, setModalState }}
		>
			<div className='w-full h-full'>
				<Navbar />

				{isModalOpen && modalState.type === 'authentication' && (
					<AuthModal>
						<AuthForm/>
					</AuthModal>	
				)}
				{isModalOpen && modalState.type === 'review' && (
					<ReviewModal>
						<ReviewForm />
					</ReviewModal>
				)}
				

				<Routes>
					<Route path='/' element={<Landing />} />
					<Route path='/home' element={<Homepage />} />
					<Route path='/home/:id' element={<AttractionPage />} />

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

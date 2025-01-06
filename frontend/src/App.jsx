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


	// useEffect(() => {
	//  console.log('Updated modal state: ', modalState);
	// }, [modalState]);


	// Function to open the modal
	// type: authentication/review
	// title: auth(logIn or signUp), review(submit or edit)
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
			}}
		>
			<div className='w-full h-full'>
				<Navbar />


				{isModalOpen && modalState.type === 'authentication' && (
					<AuthModal>
						<AuthForm />
					</AuthModal>
				)}


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

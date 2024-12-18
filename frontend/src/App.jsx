import React, { useState, useEffect, useRef, ref } from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import Landing from "./pages/Landing.jsx";
import AttractionPage from "./pages/AttractionPage.jsx";
import Navbar from "./components/ui/Navbar.jsx";
import Footer from "./components/ui/Footer.jsx";
import LogIn from "./pages/LogIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Modal from "./components/ui/Modal.jsx";
import TermsAndConditions from "./pages/TermsAndConditions.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import AboutSGSpots from "./pages/About.jsx";
import Blog from "./pages/Blog.jsx";


const App = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalType, setModalType] = useState(''); // Tracks whether it's Login or SignUp

	// Function to open the modal (Login or SignUp)
	const openModal = (type) => {
		setModalType(type); // Set which modal to show (login or sign-up)
		setIsModalOpen(true); // Open modal
	};

	// Function to close the modal
	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<div className="w-full">
			<Navbar openModal={openModal} />
			<Modal isModalOpen={isModalOpen} closeModal={closeModal} modalType={modalType} />

			<Routes>
				<Route path='/' element={<Landing />} />
				<Route path='/home' element={<Homepage />} />
				<Route path='/home/:id' element={<AttractionPage />} />

				<Route path="/blog" element={<Blog />} />
				<Route path='/privacyPolicy' element={<PrivacyPolicy />} />
				<Route path='/termsAndConditions' element={<TermsAndConditions />} />
				<Route path='/about' element={<AboutSGSpots />} />
			</Routes >
			<Footer />
		</div >
	);
};

export default App;
import React, { useState, useEffect, useRef, ref } from "react";
import Homepage from "./pages/Homepage.jsx";
import Landing from "./pages/Landing.jsx";
import AttractionPage from "./pages/AttractionPage.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
// import useScrollDirection from "./features/trackScrolling.jsx";

const App = () => {
	const oldScrollY = useRef(window.scrollY); // oldScrolly retains its value across renders

	const [direction, setDirection] = useState('up');

	const controlDirection = () => {
		console.log('Current scrollY:', window.scrollY);
		console.log('Previous scrollY:', oldScrollY.current);
		if (window.scrollY > oldScrollY.current) {
			setDirection('down');
			console.log("scrolling down")
		} else {
			setDirection('up');
			console.log("scrolling up")
		}
		oldScrollY.current = window.scrollY;
		console.log(`direction: ${direction}`)
	}

	useEffect(() => {
		console.log("Setting up scroll listener");

		window.addEventListener('scroll', controlDirection, true);

		return () => {
			window.removeEventListener('scroll', controlDirection, true);
			console.log('Scroll listener removed');
		};
	}, []);


	return (
		<div className=" h-[5000px] w-full">

			<Navbar scrollDirection={direction} />
			<Landing />
			<Footer />
		</div>
	);
};

export default App;
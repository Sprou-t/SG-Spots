import React, { useState, useEffect } from "react";
import Homepage from "./pages/Homepage.jsx";
import Landing from "./pages/Landing.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

const App = () => {
	const [counter, setCounter] = useState(0);
	console.log('App loaded')

	return (
		<div className="container h-full w-full">

			<Navbar />
			<Homepage />
			<Footer />
		</div>
	);
};

export default App;
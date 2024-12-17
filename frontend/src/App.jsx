import React, { useState, useEffect, useRef, ref } from "react";
import Homepage from "./pages/Homepage.jsx";
import Landing from "./pages/Landing.jsx";
import AttractionPage from "./pages/AttractionPage.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
// import useScrollDirection from "./features/trackScrolling.jsx";

const App = () => {
	return (
		<div className="w-full">

			<Navbar />
			<Homepage />
			<Footer />
		</div>
	);
};

export default App;
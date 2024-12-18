import React, { useState, useEffect, useRef, ref } from "react";
import Homepage from "./pages/Homepage.jsx";
import Landing from "./pages/Landing.jsx";
import AttractionPage from "./pages/AttractionPage.jsx";
import Navbar from "./components/ui/Navbar.jsx";
import Footer from "./components/ui/Footer.jsx";


const App = () => {
	return (
		<div className="w-full">

			<Navbar />
			<AttractionPage />
			<Footer />
		</div>
	);
};

export default App;
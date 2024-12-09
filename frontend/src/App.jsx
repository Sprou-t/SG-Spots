import React, { useState, useEffect } from "react";
import Landing from "./pages/landing.jsx";
import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";

const App = () => {
	const [counter, setCounter] = useState(0);
	console.log('wats up')

	return (
		<div className="container h-full w-full">
			<Navbar />
			<Landing />
			<Footer />
		</div>
	);
};

export default App;
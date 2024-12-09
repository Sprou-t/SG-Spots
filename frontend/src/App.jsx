import React, { useState, useEffect } from "react";
import Landing from "./pages/landing.jsx";

const App = () => {
	const [counter, setCounter] = useState(0);
	console.log('wats up')

	return (
		<div className="container max-h-dvh">
			<Landing />
		</div>
	);
};

export default App;
// this file inserts our root component into html file
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/tailwind.css";

const rootElement = document.querySelector("#root"); // select tag to insert root 

const root = ReactDOM.createRoot(rootElement); // create root

root.render(
	<React.StrictMode> 
		<React.Suspense fallback="loading">
			<App/>
		</React.Suspense>
	</React.StrictMode>
);

// strictmode is useful in development mode as it helps catch common mistakes early
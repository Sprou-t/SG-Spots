import React from "react";
import mainImage from "../assets/images/pexels-alaric-sim-380461-1029188.jpg"

/* TODO: main section
1. follow the webpage
2. get some good pics
3. design accordingly

*/
const Main = () => {
	console.log("landing page loaded");
	return (
		<div className="flex bg-red-200 h-screen w-screen">
			<img src={mainImage} className="w-full" />
			<div className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 text-6xl text-center font-semibold">Discover the Best <span className="text-red-600">SG SPOTS</span> Here</div>
		</div>
	);
}

const Landing = () => {
	return (
		<Main />
	)

}

export default Landing;

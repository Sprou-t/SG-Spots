import React from "react";
import mainImg from "../assets/images/pexels-alaric-sim-380461-1029188.jpg"
import findImg from "../assets/images/water-new-night-marina-business.jpg"
import writeImg from "../assets/images/garden-by-bay-night-scene-singapore.jpg"
import { SlideLeft, SlideRight } from "../components/slideInAnimation.jsx";

/* TODO: add the bottom sections
			2. make everything responsive(1279)
			3. write a blog(share your experiences) 
			4. 832 when text size needs to change*/
const Main = () => {
	console.log("landing page loaded");
	return (
		<div className="w-screen sm:p-4 m-0">
			<div className="relative flex h-screen w-screen">
				<img src={mainImg} className="w-screen object-cover m-0" alt="Main" />
				<div className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 text-6xl text-center font-semibold">
					Discover the Best <span className="text-red-600">SG SPOTS</span> Here
				</div>
			</div>

			<div className="sm:w-full md:w-4/5 flex flex-col gap-20 mx-auto py-20 m-0 xs:text-center xs:p-4">
				<SlideRight customClass="flex gap-5 flex-col lg:flex-row items-center justify-center">
					<img src={findImg} className="size-1/2" alt="Find spots" />
					<div className="flex flex-col lg:gap-10 sm:gap-2">
						<h2 className="text-2xl font-semibold">Explore Your SPOTS</h2>
						<p>
							We've curated over 1000 amazing spots across Singapore, from breathtaking views to delicious food and hidden gems. Explore places that match your mood, get community-driven insights, and enjoy authentic experiences that help you make unforgettable memories.
						</p>
					</div>
				</SlideRight>



				<SlideLeft customClass="flex gap-5 flex-col-reverse lg:flex-row items-center justify-center">
					<div className="flex flex-col lg:gap-10 sm:gap-2">
						<h2 className="text-2xl font-semibold">Write an Anonymous Review</h2>
						<p>
							Share your experiences anonymously through reviews and ratings. Whether it’s a hidden gem or a popular spot, your honest feedback helps others make informed choices and fosters a trusted community of recommendations.
						</p>
					</div>
					<img src={writeImg} className="size-1/2" alt="Write reviews" />
				</SlideLeft>
			</div >
		</div>

	);
}

const Landing = () => {
	return (
		<Main />
	)

}

export default Landing;

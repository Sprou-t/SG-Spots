import React from "react";
import mainImg from "../assets/images/pexels-alaric-sim-380461-1029188.jpg"
import findImg from "../assets/images/water-new-night-marina-business.jpg"
import writeImg from "../assets/images/garden-by-bay-night-scene-singapore.jpg"
import { SlideLeft, SlideRight } from "../components/slideInAnimation.jsx";

/* TODO: add the bottom sections
			1. follow rateMyDorm's footer design
			2. make everything responsive
			3. write a blog(share your experiences) 
			4.*/
const Main = () => {
	console.log("landing page loaded");
	return (
		<>
			<div className="relative flex bg-red-200 h-screen w-screen mb-24">
				<img src={mainImg} className="w-full" alt="Main" />
				<div className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 text-6xl text-center font-semibold">
					Discover the Best <span className="text-red-600">SG SPOTS</span> Here
				</div>
			</div>

			<div className="w-4/5 m-auto grid gap-12">
				<SlideRight customClass="flex gap-5">
					<img src={findImg} className="size-9/12" alt="Find spots" />
					<div className="flex flex-col gap-10">
						<h2 className="text-2xl font-semibold">Explore Your SPOTS</h2>
						<p>
							We've gathered over 1000 amazing spots across Singapore just for you! Whether you're looking
							for breathtaking views, delicious food, hidden gems, or vibrant entertainment, we’ve got you
							covered. Discover the perfect places that match your mood and preferences, whether you're
							feeling adventurous, relaxed, energetic, or contemplative. Our community-driven reviews and
							ratings ensure you get the most authentic and up-to-date experiences, helping you explore,
							enjoy, and create unforgettable memories.
						</p>
					</div>
				</SlideRight>



				<SlideLeft customClass="flex gap-5">
					<div className="flex flex-col gap-10">
						<h2 className="text-2xl font-semibold">Write an Anonymous Review</h2>
						<p>
							Share your unique experiences and insights with the community through anonymous reviews and
							ratings! Help others discover their favorite spots by providing honest feedback based on
							your visits. Whether it’s a hidden gem, a popular destination, or a place with room for
							improvement, your contributions can make a difference. Your ratings and reviews help others
							make informed decisions and create a vibrant, trusted space for sharing recommendations.
						</p>
					</div>
					<img src={writeImg} className="size-9/12" alt="Write reviews" />
				</SlideLeft>
			</div >
		</>

	);
}

const Landing = () => {
	return (
		<Main />
	)

}

export default Landing;

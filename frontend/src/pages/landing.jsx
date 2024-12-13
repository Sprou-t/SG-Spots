import React, { useState, useEffect } from 'react';
import mainImg1 from "../assets/images/pexels-alaric-sim-380461-1029188.jpg"
import mainImg2 from "../assets/images/Singapore-Bird-Paradise-8a764bb0-aaa3-407f-a934-d594dee2bf10.jpeg"
import mainImg3 from "../assets/images/sentosa-island-singapore-23-1440x1920.webp"
import mainImg4 from "../assets/images/night-wonderful-urban-beautiful-landscape.jpg"
import mainImg5 from "../assets/images/beautiful-flamingos-zoo.jpg"
import findImg from "../assets/images/water-new-night-marina-business.jpg"
import writeImg from "../assets/images/garden-by-bay-night-scene-singapore.jpg"
import { SlideLeft, SlideRight } from "../components/slideInAnimation.jsx";
import Carousel from '../components/carousell.jsx';

/* TODO: add the bottom sections
			2. make an image carousell
			3. write a blog(share your experiences) 
			4. 832 when text size needs to change*/


const Main = () => {
	console.log("landing page loaded");
	const images = [mainImg1, mainImg2, mainImg3, mainImg4, mainImg5];
	return (
		<div className="w-screen sm:py-4 m-0">
			<div className="relative flex h-screen w-screen">
				<Carousel images={images} autoSlide={true} autoSlideInterval={5000} />
			</div>

			<div className="sm:w-screen md:w-4/5 flex flex-col gap-20 md:mx-auto py-40 m-0 xs:text-center xs:p-16">
				<SlideRight customClass="flex gap-5 flex-col lg:flex-row items-center justify-center">
					<img src={findImg} className="lg:size-1/2" alt="Find spots" />
					<div className="flex flex-col lg:gap-10 sm:gap-2">
						<h2 className="text-2xl font-semibold">Welcome To <span className='font-bold text-red-600'>SG</span> <span className='font-bold'>SPOTS</span> </h2>
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
					<img src={writeImg} className="lg:size-1/2" alt="Write reviews" />
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

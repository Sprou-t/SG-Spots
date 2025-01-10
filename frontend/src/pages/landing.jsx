import React, { useState } from 'react';
import mainImg1 from '../assets/landingImages/pexels-alaric-sim-380461-1029188.jpg';
import mainImg2 from '../assets/landingImages/Singapore-Bird-Paradise-8a764bb0-aaa3-407f-a934-d594dee2bf10.jpeg';
import mainImg3 from '../assets/landingImages/sentosa-island-singapore-23-1440x1920.webp';
import mainImg4 from '../assets/landingImages/night-wonderful-urban-beautiful-landscape.jpg';
import mainImg5 from '../assets/landingImages/beautiful-flamingos-zoo.jpg';
import findImg from '../assets/landingImages/water-new-night-marina-business.jpg';
import writeImg from '../assets/landingImages/pexels-nextvoyage-3881761.jpg';
import { SlideLeft, SlideRight } from '../components/animation/SlideInAnimation.jsx';
import { Link } from 'react-router-dom';
import gardensByTheBay from '../assets/landingImages/pexels-nextvoyage-3881761.jpg';

const Main = () => {
	return (
		<>
			<div className='p-14 h-full w-full  flex flex-col gap-10 xl:gap-16 justify-end bg-fixed bg-parallax1 bg-cover  md:bg-cover bg-center md:bg-right '>
				<h2 className='tracking-tight uppercase text-customYellow text-6xl font-extrabold max-w-[590px]'>
					Welcome to SG SPOTS
				</h2>
				<h3 className='uppercase tracking-tight text-white text-4xl md:text-3xl lg:text-4xl font-extrabold w-[650px] mb-20'>
					Your one stop platform for finding Singapore spots
				</h3>
			</div>

			<div className='flex gap-10 xl:gap-20 px-1 md:px-3 lg:px-0 lg:w-11/12 lg:mx-auto py-10 items-center justify-center'>
				<div className='uppercase flex flex-col gap-6'>
					<h2 className='text-6xl md:text-xl xl:text-4xl font-bold max-w-[480px]'>Explore what Singapore has to offer</h2>
					<p className='text-4xl md:text-lg w-[480px] tracking-wide'>
						Look through our extensive collection of information to discover the
						<span className='font-bold'> best spots</span>,
						<span className='font-bold'> hidden gems</span>, and
						<span className='font-bold'> must-see attractions</span> across Singapore. Whether you're seeking breathtaking views, delicious food, or unforgettable experiences, we’ve got something for every kind of explorer.
					</p>
					<Link to={'/home'}>
						<button className='flex items-center justify-center bg-customBlack rounded-xl text-white font-bold size-24 md:size-10 w-80 md:w-40 text-3xl md:text-base py-3'>Go To Homepage</button>
					</Link>
				</div>
				<img src={gardensByTheBay} alt='gardens by the bay' className='hidden md:block xs:max-w-80 md:max-w-96 xl:max-w-[608px] h-auto' />
			</div>

			<div className='h-[700px] w-full relative bg-fixed bg-parallax2 bg-cover'>
				<div className='absolute inset-0 bg-black opacity-50 z-0'></div>

				<p className='text-8xl uppercase font-open-sans 2xl:text-[9rem] font-extrabold text-customYellow drop-shadow-md absolute top-0 left-4 z-10'>
					Find
				</p>
				<p className='text-3xl  tracking-wide font-open-sans 2xl:text-4xl font-extrabold text-customYellow drop-shadow-md absolute xl:-translate-y-1/2 top-1/2  left-8 lg:left-16 w-[650px] z-10'>
					Join a community of Singapore lovers and share your favorite spots, uncover hidden gems, and enjoy unforgettable experiences.
				</p>
				<p className='text-8xl  uppercase font-open-sans 2xl:text-[9rem] font-bold text-customYellow drop-shadow-md absolute top-40 lg:top-48 right-5 lg:right-10 z-10'>
					And
				</p>
				<p className='text-8xl uppercase font-open-sans 2xl:text-[9rem] font-extrabold text-customYellow drop-shadow-md absolute bottom-0 md:right-10 z-10'>
					Leave ratings
				</p>
			</div>
		</>
	);
};

const Landing = () => {
	return <Main />;
};

export default Landing;

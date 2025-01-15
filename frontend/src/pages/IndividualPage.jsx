import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
import { MdOutlineStarRate } from 'react-icons/md';
import { MdAccessTimeFilled } from 'react-icons/md';
import Carousel from '../components/animation/Carousell.jsx';
import ReviewSection from '../components/ui/ReviewSection.jsx';
import ReviewForm from '../components/ui/ReviewForm.jsx';
import ReviewModal from '../components/ui/reviewModal.jsx';
import { useParams } from 'react-router-dom';
import { PropsContext } from '../context/context.props.jsx';
import fallBackImage from '../assets/homepageImages/pexels-stijn-dijkstra-1306815-2499786.jpg'
import { removeTokenIfExpired } from '../services/services.review.js';


/* TODO:
-Review section + make icons more colorful
 */


const IndividualPage = () => {
	const { id } = useParams(); // uuid
	console.log('uuid ==> ', id);
	// console.log('token: ', token)

	const [attraction, setAttraction] = useState(null);
	const { isModalOpen, modalState } = useContext(PropsContext);

	const handleImageError = (event) => {
		event.target.src = fallBackImage; // Set fallback image when an error occurs
	};

	// console.log('attraction page renders')
	// Extract the fetch logic into a reusable function
	const fetchAttractionData = () => {
		axios
			.get(`http://localhost:8080/TIHData/${id}`)
			.then((response) => {
				console.log("response ==> ", response); // Log actual data
				setAttraction(response.data); // Set the correct data
			})
			.catch((error) => {
				console.error("Error fetching attractions:", error);
			});
	}

	// Initial fetch on component mount
	useEffect(() => {
		fetchAttractionData();
	}, [id]);
	console.log('attraction data:', attraction)

	useEffect(() => {
		removeTokenIfExpired()
	})


	if (attraction != null) {
		const imageCounter = attraction.images.length;
		return (
			<div className='w-full '>
				<div className='w-10/12 mx-auto'>
					{imageCounter > 1 ? (
						<Carousel images={attraction.images} />
					) : (
						<img src={attraction.images[0]} onError={handleImageError} className='w-full h-full max-h-[800px] object-contain' />
					)}
				</div >


				{isModalOpen && modalState.type === 'review' && (
					<ReviewModal>
						<ReviewForm attractionId={id} handleReviewSubmit={fetchAttractionData} />
					</ReviewModal>
				)}


				<div className='w-10/12 mx-auto my-14 gap-10 flex flex-col items-center'>
					<div className='flex items-center text-4xl font-semibold text-gray-600 gap-6 justify-center gray-800'>
						<h2>{attraction.name}</h2>
					</div>
					<div className='md:flex gap-16 text-xl justify-center  border-2 xs:p-2 md:p-10'>
						<div className='flex-col gap-6 flex mb-6 md:mb-0'>
							<div className='flex items-center gap-1 font-bold text-gray-600'>
								<MdOutlineStarRate />
								<p>
									Rating:{' '}
									<span >
										{attraction.rating}
									</span>
								</p>
							</div>
							<div className='flex items-center gap-1 font-bold text-gray-600'>
								<RiMoneyDollarCircleFill />
								<p>
									Price:{' '}
									<span >
										{attraction.pricing}
									</span>
								</p>
							</div>
						</div>
						<div className='flex-col gap-6 flex'>
							<div className='flex items-center gap-1'>
								<MdAccessTimeFilled />
								<p className='font-bold text-gray-600'>
									Category:{' '}
									{attraction.categoryDescription}
								</p>
							</div>
							<div className='flex items-center gap-1'>
								<FaLocationDot />
								<p className='font-bold text-gray-600'>
									Postal Code:{' '}
									{attraction.address}
								</p>
							</div>
						</div>
					</div>
					<p className='text-lg w-7/12 leading-relaxed text-center '>
						{attraction.description}
					</p>
					<a
						href={attraction.website}
						target='_blank'
						rel='noopener noreferrer'
						className='text-red-600 hover:text-customRed-light text-lg underline font-semibold'
					>
						Find out more
					</a>
					<ReviewSection id={id} reviews={attraction.userReviews} />
				</div>
			</div >
		);
	}
};


export default IndividualPage;

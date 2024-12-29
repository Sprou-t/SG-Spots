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
import { token } from '../services/services.review.js';

/* TODO:
-Review section + make icons more colorful
 */

const AttractionPage = () => {
	const { id } = useParams();
	console.log('id ==> ', id);
	console.log('token: ',token)

	const [attraction, setAttraction] = useState(null);
	const { isModalOpen, modalState } = useContext(PropsContext);

	console.log('attraction page renders')
	// Extract the fetch logic into a reusable function
	const fetchAttractionData = () => {
		axios
			.get(`http://localhost:3000/api/${id}`)
			.then((response) => {
				setAttraction(response.data.attractionData);
			})
			.catch((error) => {
				console.error('Error fetching attractions:', error);
			});
	};

	// Initial fetch on component mount
	useEffect(() => {
		fetchAttractionData();
	}, [id]);

	if (attraction != null) {
		const imageCounter = attraction.imageURL.length;
		return (
			<div>
				{imageCounter > 1 ? (
					<Carousel images={attraction.imageURL} />
				) : (
					<img src={attraction.imageURL[0]} alt='' />
				)}

				{isModalOpen && modalState.type === 'review' && (
					<ReviewModal>
						<ReviewForm attractionId={id} handleReviewSubmit = {fetchAttractionData} />
					</ReviewModal>
				)}

				<div className='w-10/12 mx-auto my-14 gap-10 flex flex-col items-center'>
					<div className='flex items-center text-4xl font-semibold text-gray-600 gap-6 justify-center gray-800'>
						<h2>{attraction.title}</h2>
					</div>
					<div className='md:flex gap-16 text-xl justify-center  border-2 xs:p-2 md:p-10'>
						<div className='flex-col gap-6 flex mb-6 md:mb-0'>
							<div className='flex items-center gap-3'>
								<MdOutlineStarRate />
								<p>
									Rating:{' '}
									<span className='font-bold text-gray-600'>
										{attraction.rating}
									</span>
								</p>
							</div>
							<div className='flex items-center gap-1'>
								<RiMoneyDollarCircleFill />
								<p>
									Price{' '}
									<span className='font-bold text-gray-600'>
										{attraction.pricing}
									</span>
								</p>
							</div>
						</div>
						<div className='flex-col gap-6 flex'>
							<div className='flex items-center gap-1'>
								<MdAccessTimeFilled />
								<p className='font-bold text-gray-600'>
									{attraction.openingTime} -{' '}
									{attraction.closingTime}
								</p>
							</div>
							<div className='flex items-center gap-1'>
								<FaLocationDot />
								<p className='font-bold text-gray-600'>
									{' '}
									{attraction.address}
								</p>
							</div>
						</div>
					</div>
					<p className='text-lg w-7/12 leading-relaxed '>
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
					<ReviewSection id={id} reviews={attraction.reviews}/>
				</div>
			</div>
		);
	}
};

export default AttractionPage;

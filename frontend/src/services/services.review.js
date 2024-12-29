import axios from 'axios';

const reviewBaseUrl = 'http://localhost:3000/review';
let token = null;

// this function will be invoked when user login in authForm
// it will change the value of token in this module
const setToken = (newToken) => {
	token = `Bearer ${newToken}`;
};

const ensureUserIsLoggedInAndTokenIsSet = () => {
	// Check if the token is already set in the module
	if (!token) {
		const loggedInUser = window.localStorage.getItem('loggedInUser');
		if (loggedInUser) {
			const loggedInUserToken = JSON.parse(loggedInUser).token;
			if (loggedInUserToken) {
				setToken(loggedInUserToken); // Set the token if it's found
			}
		}
	}
};

const createReview = async (newReview) => {
	ensureUserIsLoggedInAndTokenIsSet();
	const config = {
		headers: { 
			Authorization: token, 
		},
	};
	console.log('config ', config);

	const response = await axios.post(reviewBaseUrl, newReview, config);
	return response.data;
};

// TODO: update review with user token
const updateReview = async (updatedReviewData) => {
	ensureUserIsLoggedInAndTokenIsSet();
	{
	}
	const config = {
		headers: { Authorization: token },
	};
	const updatedReviewContent = {
		rating: updatedReviewData.rating,
		description: updatedReviewData.description,
	};

	const updatedReviewId = updatedReviewData.reviewId;
	let response;
	try {
		response = await axios.put(
			`${reviewBaseUrl}/${updatedReviewId}`,
			updatedReviewContent,
			config
		);
	} catch (err) {
		console.error('error: ', err);
	}

	return response.data;
};

const deleteReview = async (reviewId) => {
	ensureUserIsLoggedInAndTokenIsSet();
	const config = {
		headers: { Authorization: token },
	};

	let response;
	try {
		response = await axios.delete(`${reviewBaseUrl}/${reviewId}`, config);
	} catch (err) {
		console.error('error: ', err);
	}

	return response.data;
};

export { createReview, updateReview, deleteReview, setToken, token };

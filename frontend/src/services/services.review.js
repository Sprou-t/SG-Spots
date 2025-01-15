import axios from 'axios';

const reviewBaseUrl = 'http://localhost:8080/review';
let token = null;

// this function will be invoked when user login in authForm
// it will change the value of token in this module
const setToken = (newToken) => {
	token = `Bearer ${newToken}`;
};

const removeTokenIfExpired = () => {
	const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));

	if (loggedInUser) {
		const currentTimestamp = new Date().getTime();
		const storedTimestamp = loggedInUser.timestamp;

		// Check if 48 hours (48 * 60 * 60 * 1000 ms) have passed since the timestamp
		if (currentTimestamp - storedTimestamp > 48 * 60 * 60 * 1000) {
			// Clear localStorage if the token is expired
			window.localStorage.removeItem('loggedInUser');
			console.log('User session expired. Please log in again.');
		}
	}
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

const updateReview = async (data) => {
	console.log("data ==> ", data);
	// Ensure user is logged in and token is set
	ensureUserIsLoggedInAndTokenIsSet();

	// Destructure the input data
	const { reviewId, attractionId, rating, description, avatar } = data;

	// Validate required fields
	if (!reviewId) {
		console.error('Review ID is missing');
		return;
	}

	// Create the FormData object and append data
	const formData = new FormData();
	formData.append('reviewId', reviewId);
	formData.append('attractionId', attractionId);
	formData.append('rating', rating);
	formData.append('description', description);

	// Append the file only if it exists
	if (avatar) {
		formData.append('avatar', avatar);
	}

	// Debugging: Log the FormData contents
	for (let [key, value] of formData.entries()) {
		console.log(`${key}:`, value);
	}

	// Set up config with Authorization token
	const config = {
		headers: {
			Authorization: token, // Ensure the token is valid
			'Content-Type': 'multipart/form-data', // Correct format
		},
	};

	// Construct the URL for updating the review
	const updateReviewUrl = `${reviewBaseUrl}/${reviewId}`;
	console.log('Update Review URL:', updateReviewUrl);

	try {
		// Make the PUT request with FormData
		const response = await axios.put(updateReviewUrl, formData, config);
		console.log('Update response:', response.data);
		return response.data; // Return the response data
	} catch (err) {
		console.error('Error updating review: ', err.response?.data || err.message);
		return null;
	}
};


const deleteReview = async (reviewId) => {
	ensureUserIsLoggedInAndTokenIsSet();
	const config = {
		headers: { Authorization: token },
	};

	let response;
	try {
		response = await axios.delete(`${reviewBaseUrl}/${reviewId}`, config);
		console.log("response ==> ", response);
	} catch (err) {
		console.error('error: ', err);
	}

	return response;
};

export { removeTokenIfExpired, createReview, updateReview, deleteReview, setToken, token };

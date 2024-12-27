import axios from 'axios';
const ReviewUrl = 'http://localhost:3000/review';

let token = null;

// this function will be invoked when user login in authForm
// it will change the value of token in this module
const setToken = (newToken) => {
	token = `Bearer ${newToken}`;
};

const createReview = async (newReview) => {
	const config = {
		headers: { Authorization: token },
	};
	console.log(`token ${token}`);

	const response = await axios.post(ReviewUrl, newReview, config);
	return response.data;
};

// TODO: update review with user token

export { createReview, setToken };

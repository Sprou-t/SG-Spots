import axios from 'axios';

const logInBaseUrl = 'http://localhost:3000/user/login';
const signUpBaseUrl = 'http://localhost:3000/user/signUp';

const logIn = async (credentials) => {
	try {
		const response = await axios.post(logInBaseUrl, credentials);
		return response.data;
	} catch (error) {
		// Log the error to see what went wrong
		console.error('Error during login:', error);

		// Handle the error based on its type
		if (error.response) {
			// Server responded with a status code other than 2xx
			console.error('Response data:', error.response.data);
			console.error('Response status:', error.response.status);
			console.error('Response headers:', error.response.headers);
		} else if (error.request) {
			// Request was made but no response was received
			console.error('No response received:', error.request);
		} else {
			// Other errors (e.g., setting up the request)
			console.error('Error message:', error.message);
		}
	}
};

const signUp = async (credentials) => {
	const response = await axios.post(signUpBaseUrl, credentials);
	return response.data;
};

export { logIn, signUp };

import axios from 'axios';
import { auth } from '../firebase/firebase.config.js'; // Import the auth instance
import { signInWithEmailAndPassword, getIdToken } from 'firebase/auth';

const logInBaseUrl = 'http://localhost:3000/user/logIn';
const signUpBaseUrl = 'http://localhost:3000/user/signUp';

// credentails contain username and password
// note that even with 1hr expiration time for firebasetoken, i am 
// using jwt token that has 48 hour expiration.
// backend returns: userId, token, email
const logIn = async (credentials) => {
	try {
		const response = await axios.post(logInBaseUrl, {
			email: credentials.email,
			password: credentials.password,
		});
		console.log('User logged in successfully:', response.data);

		// Return a success response
		return response.data;
	} catch (error) {
		// Log the error details
		console.error('Error during login:', error);

		// Handle different error types and return a failure response
		if (error.response) {
			return { success: false, message: error.response.data.message || 'Login failed' };
		} else if (error.request) {
			return { success: false, message: 'No response from server' };
		} else {
			return { success: false, message: error.message };
		}
	}
};


// sign up + log in
// credentials include email, username and password
const signUp = async (credentials) => {
	try {
		// Sign up response returns a custom token
		const signUpResponse = await axios.post(signUpBaseUrl, credentials);
		console.log('User signed up successfully:', signUpResponse.data);

		// Return a success response
		return { success: true, data: signUpResponse.data };
	} catch (error) {
		// Log the error details
		console.error('Error during sign up:', error);

		// Handle different error types and return a failure response
		if (error.response) {
			return { success: false, message: error.response.data.message || 'Sign up failed' };
		} else if (error.request) {
			return { success: false, message: 'No response from server' };
		} else {
			return { success: false, message: error.message };
		}
	}
};


export { logIn, signUp };

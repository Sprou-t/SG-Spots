import axios from 'axios';
import { auth } from '../firebase/firebase.js'; // Import the auth instance
import { signInWithEmailAndPassword, getIdToken } from 'firebase/auth';

const logInBaseUrl = 'http://localhost:3000/user/logIn';
const signUpBaseUrl = 'http://localhost:3000/user/signUp';

// credentails contain username and password
// note that even with 1hr expiration time for firebasetoken, i am 
// using jwt token that has 48 hour expiration.
// backend returns: userId, token, email
const logIn = async (credentials) => {
	// create token id function lies here
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			credentials.email,
			credentials.password
		);

		if (!userCredential.user.emailVerified) {
			console.error('Email not verified');
			return { success: false, message: 'Please verify your email before logging in.', user: null };
		}
		// firebaseIdToken are used to securely communicate with backend services
		const firebaseIdToken = await getIdToken(userCredential.user);
		const response = await axios.post(logInBaseUrl, {
			email: credentials.email,
			idToken: firebaseIdToken,
		});
		console.log('User logged in successfully:', response.data);
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

// sign up + log in
// credentials include email, username and password
const signUp = async (credentials) => {
	try {
		// signup response returns custom token
		await axios.post(signUpBaseUrl, credentials);

		// Once sign-up is successful, proceed to login using the ID token
		const loginResponse = await logIn(credentials);
		return loginResponse; // contains username, email, password
	} catch (error) {
		console.error('Error during sign up:', error);
		if (error.response) {
			console.error('Response data:', error.response.data);
		} else if (error.request) {
			console.error('No response received:', error.request);
		} else {
			console.error('Error message:', error.message);
		}
	}

	// //continue with login
	// const loginResponse = await logIn(credentials);
	// // backend returns: userId, token, email
	// return loginResponse;
};

export { logIn, signUp };

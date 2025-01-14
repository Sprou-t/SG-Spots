import React, { useContext, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { PropsContext } from '../../context/context.props.jsx';
import { logIn, signUp } from '../../services/services.auth.js';
import { setToken } from '../../services/services.review.js';
import { auth } from '../../firebase/firebase.config.js';
/*TODO: check that URL is correct */

const AuthForm = () => {
	const {
		setUser,
		modalState,
		setModalState,
		openModal,
		closeModal,
		showNotification,
	} = useContext(PropsContext);
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	// className = "mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900"

	const handleAuth = async (event) => {
		event.preventDefault();
		let loginResponse;
		if (modalState.title === 'logIn') {
			loginResponse = await logIn({
				email,
				password,
			});
			console.log("loginResponse ==> ", loginResponse.data);
			if (!loginResponse.success) {
				// add a modal also
				openModal('notification', 'logIn', null);
				console.log('user log in fail');
				showNotification(
					'Login failed. Please check your credentials.',
					'error'
				);
			} else {	
				setUser(loginResponse.data);
				setToken(loginResponse.data.token);
				const currentTimestamp = new Date().getTime();
				window.localStorage.setItem(
					'loggedInUser',
					JSON.stringify({ user: loginResponse.data, timestamp: currentTimestamp })
				);
				showNotification('Login successful!', 'success');
			}
		} else {
			await signUp({
				email,
				username,
				password,
			});
			console.log('signed In');
			setUsername('');
			showNotification('Sign up successful! A copy of your authentication detail is sent to email. You can now log in.', 'success')
		}

		setPassword('');
		setEmail('');
		closeModal();
	};

	return (
		<>
			<div className='flex min-h-full flex-1 flex-col justify-center px-6 w-full lg:px-8'>
				<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
					<h2 className='mt-10 text-center text-5xl md:text-2xl font-bold tracking-tight text-gray-900'>
						{modalState.title === 'logIn'
							? 'Log in to your account'
							: 'Sign up for an account'}
					</h2>
				</div>

				<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
					<form
						action='#'
						method='POST'
						className='space-y-6'
						onSubmit={handleAuth}
					>
						{modalState.title === 'signUp' && (
							<div>
								<label
									htmlFor='username'
									className='block text-3xl md:text-sm font-medium text-gray-900'
								>
									Username
								</label>
								<div className='mt-2'>
									<input
										id='username'
										name='username'
										data='username'
										required
										autoComplete='username'
										value={username}
										onChange={(e) =>
											setUsername(e.target.value)
										}
										className='block w-full rounded-md px-3 py-2 text-3xl md:text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 '
									/>
								</div>
							</div>
						)}
						<div>
							<label
								htmlFor='email'
								className='block text-3xl md:text-sm font-medium text-gray-900'
							>
								Email
							</label>
							<div className='mt-2'>
								<input
									id='email'
									name='email'
									data='email'
									required
									autoComplete='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className='block w-full rounded-md px-3 py-2 text-3xl md:text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 '
								/>
							</div>
						</div>

						<div>
							<div className='flex items-center justify-between'>
								<label
									htmlFor='password'
									className='block text-3xl md:text-sm font-medium text-gray-900'
								>
									Password
								</label>
								<div className='text-sm'>
									<a
										href='#'
										className='text-2xl md:text-sm font-semibold text-red-500 hover:text-customRed-light'
									>
										Forgot password?
									</a>
								</div>
							</div>
							<div className='mt-2'>
								<input
									id='password'
									name='password'
									data='password'
									required
									autoComplete='current-password'
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									className='block w-full rounded-md bg-white px-3 py-2 text-3xl md:text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
								/>
							</div>
						</div>

						<div>
							<button
								data='submit'
								className='flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-3xl md:text-base font-semibold text-white shadow-sm hover:bg-customRed-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
							>
								{modalState.title === 'logIn'
									? 'Log In'
									: 'Sign up'}
							</button>
						</div>
						<div className='flex items-center my-4'>
							<div className='flex-grow border-t border-gray-300'></div>
							<span className='mx-4 text-gray-500 text-2xl md:text-sm'>
								{modalState.title === 'logIn'
									? 'Or log in with'
									: 'Or sign up with'}
							</span>
							<div className='flex-grow border-t border-gray-300'></div>
						</div>

						{/* <div className='flex gap-16 justify-center'> */}
						<button
							data='submit'
							className='w-full h-full border-1 flex gap-2 size-10 justify-center rounded-md px-1.5 py-2 text-3xl md:text-base font-semibold shadow-xl hover:scale-110 hover:shadow-md hover:shadow-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
						>
							<FcGoogle className='size-10 md:size-6' />
							<p>Google</p>
						</button>
						{/* <button
								data='submit'
								className='flex size-16 justify-center rounded-md  px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xl hover:scale-110 bg-blue-800 hover:shadow-md hover:shadow-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
							>
								<FaFacebook className='size-12' />
							</button> */}
						{/* </div> */}
					</form>

					{modalState.title === 'logIn' && (
						<p className='mt-10 text-center text-sm/6 text-gray-500 flex gap-2 justify-center'>
							Don't have an account?{' '}
							<button
								onClick={() =>
									setModalState({
										...modalState,
										title: 'signUp',
									})
								}
								className='font-semibold text-red-500 hover:text-customRed-light'
							>
								Sign up here!
							</button>
						</p>
					)}
				</div>
			</div>
		</>
	);
};

export default AuthForm;

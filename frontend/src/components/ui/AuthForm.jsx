import React, { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { PropsContext } from '../../context/context.props.jsx';
/*TODO: check that URL is correct */

const AuthForm = () => {
	const { modalState, setModalState } = useContext(PropsContext);
	const logInUrl = '/user/logIn';
	const signUpUrl = '/user/signUp';
	// className = "mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900"
	return (
		<>
			<div className='flex min-h-full flex-1 flex-col justify-center px-6 w-full lg:px-8'>
				<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
					<h2 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>
						{modalState.authType === 'logIn'
							? 'Log in to your account'
							: 'Sign up for an account'}
					</h2>
				</div>

				<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
					<form action='#' method='POST' className='space-y-6'>
						<div>
							<label
								htmlFor='email'
								className='block text-sm/6 font-medium text-gray-900'
							>
								Email address
							</label>
							<div className='mt-2'>
								<input
									id='email'
									name='email'
									Data='email'
									required
									autoComplete='email'
									className='block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
								/>
							</div>
						</div>

						<div>
							<div className='flex items-center justify-between'>
								<label
									htmlFor='password'
									className='block text-sm/6 font-medium text-gray-900'
								>
									Password
								</label>
								<div className='text-sm'>
									<a
										href='#'
										className='font-semibold text-red-500 hover:text-customRed-light'
									>
										Forgot password?
									</a>
								</div>
							</div>
							<div className='mt-2'>
								<input
									id='password'
									name='password'
									Data='password'
									required
									autoComplete='current-password'
									className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
								/>
							</div>
						</div>

						<div>
							<button
								Data='submit'
								className='flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-customRed-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
							>
								{modalState.authType === 'logIn'
									? 'Log In'
									: 'Sign up'}
							</button>
						</div>
						<div class='flex items-center my-4'>
							<div class='flex-grow border-t border-gray-300'></div>
							<span class='mx-4 text-gray-500 text-sm'>
								{modalState.authType === 'logIn'
									? 'Or log in with'
									: 'Or sign up with'}
							</span>
							<div class='flex-grow border-t border-gray-300'></div>
						</div>

						<div className='flex gap-16 justify-center'>
							<button
								Data='submit'
								className='border-1 flex size-16 justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold shadow-xl hover:scale-110 hover:shadow-md hover:shadow-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
							>
								<FcGoogle className='size-12' />
							</button>
							<button
								Data='submit'
								className='flex size-16 justify-center rounded-md  px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xl hover:scale-110 bg-blue-800 hover:shadow-md hover:shadow-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
							>
								<FaFacebook className='size-12' />
							</button>
						</div>
					</form>

					{modalState.authType === 'logIn' && (
						<p className='mt-10 text-center text-sm/6 text-gray-500 flex gap-2 justify-center'>
							Don't have an account?{' '}
							<button
								onClick={() =>
									setModalState({
										...modalState,
										authType: 'signUp',
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

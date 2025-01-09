import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/navbarImages/borders-2099224.svg';
import Searchbox from './Searchbox.jsx';
import { GiHamburgerMenu } from 'react-icons/gi';
import { CgProfile } from 'react-icons/cg';
import axios from 'axios';
import { PropsContext } from '../../context/context.props.jsx';



const Navbar = () => {
	const [direction, setDirection] = useState('up');
	const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const oldScrollY = useRef(window.scrollY);
	const navbarRef = useRef(null);
	const profileRef = useRef(null);

	const { setSearchQuery, user, setUser, openModal } =
		useContext(PropsContext);

	const controlDirection = () => {
		if (window.scrollY > oldScrollY.current) {
			setDirection('down');
			setSearchQuery('');
		} else {
			setDirection('up');
		}
		setIsMenuOpen(false);
		oldScrollY.current = window.scrollY;
	};

	const clickOutsideAndCloseMenu = (event) => {
		// if current navbarRef is not null(user clicked on sth) && current ref does not contain target(user clicks outside)
		if (navbarRef.current && !navbarRef.current.contains(event.target)) {
			setIsMenuOpen(false);
			setIsDropdownOpen(false);
			setSearchQuery('');
		}
	};

	const toggleDropdown = () => {
		setIsDropdownOpen((prev) => !prev);
	};

	const clickOutsideAndCloseDropDown = (event) => {
		// if current navbarRef is not null(user clicked on sth) && current ref does not contain target(user clicks outside)
		if (
			profileRef.current &&
			!profileRef.current.contains(event.target) &&
			isDropdownOpen
		) {
			toggleDropdown();
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', controlDirection, true);
		document.addEventListener('click', clickOutsideAndCloseMenu);
		document.addEventListener('click', clickOutsideAndCloseDropDown);
		return () => {
			window.removeEventListener('scroll', controlDirection, true);
			document.removeEventListener('click', clickOutsideAndCloseMenu);
			document.removeEventListener('click', clickOutsideAndCloseDropDown);
		};
	}, []);

	useEffect(() => {
		const loggedInUser = window.localStorage.getItem('loggedInUser');
		if (loggedInUser) {
			const user = JSON.parse(loggedInUser);
			setUser(user);
		}
	}, []);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const openLoginForm = () => {
		openModal({
			type: 'authentication',
			title: 'logIn',
			reviewId: null,
		});
	};
	const openSignUpForm = () => {
		openModal({
			type: 'authentication',
			title: 'signUp',
			reviewId: null,
		});
	};

	const logUserOut = () => {
		window.localStorage.removeItem('loggedInUser');
		setUser(null);
	};

	return (
		<div
			ref={navbarRef}
			className={` md:hover:bg-white text-black group z-50 fixed top-0 w-full md:bg-custom-gradient bg-white backdrop-filter  font-bold transition-transform duration-300 ${direction === 'up' ? 'translate-y-0' : '-translate-y-full'
				}`}
		>
			<div className='text-lg h-24 relative flex justify-between items-center px-4 py-1'>
				{/* Logo */}
				<Link to='/home' className='flex gap-2 items-center'>
					<img
						src={logo}
						alt='SG SPOTS'
						className='h-16 rounded-lg'
					/>
					<h1>
						<span className='text-red-600'>SG</span> SPOTS
					</h1>
				</Link>

				{/* Hamburger Menu Toggle Button: hidden until md:flex */}
				<button
					onClick={toggleMenu}
					className='md:hidden flex items-center  focus:outline-none'
				>
					<GiHamburgerMenu />
				</button>

				<Searchbox />

				{/* Desktop Navigation */}
				<div className='hidden md:flex gap-8 items-center'>
					<Link to='/about'>
						<p className='uppercase'>About</p>
					</Link>
					<button className='uppercase'>Blogs</button>
					<div className='relative'>
						{/* use conditional rendering */}
						{user !== null ? (
							<button
								className='relative flex gap-2 items-center white border-2 px-3 py-2 rounded-full'
								onClick={toggleDropdown}
							>
								{' '}
								<GiHamburgerMenu className='size-5' />
								<div className=' size-10 text-2xl border-2 border-solid  rounded-full text-red-500 bg-white'>
									{user.email.charAt(0)}
								</div>
							</button>
						) : (
							<button
								className='relative flex gap-2 items-center  border-2 px-3 py-2 rounded-full'
								onClick={toggleDropdown}
							>
								{' '}
								<GiHamburgerMenu className='size-5' />
								<CgProfile className='size-9' />
							</button>
						)}

						{/*dropdown menu */}
						{isDropdownOpen && (
							<div
								className='absolute top-full left-0 flex flex-col bg-white shadow-lg rounded-md mt-1 md:w-28'
								ref={profileRef}
								onClick={toggleDropdown}
							>
								{user !== null ? (
									<div className='flex flex-col gap-1 p-1 '>
										<button className='text-black inline-flex items-center justify-center h-9 px-4 py-2 font-bold hover:bg-gray-100'>
											Notification
										</button>
										<button className='text-black inline-flex items-center justify-center h-9 px-4 py-2 font-bold hover:bg-gray-100'>
											Setting
										</button>
										<button
											onClick={logUserOut}
											className='text-black inline-flex items-center justify-center h-9 px-4 py-2 font-bold hover:bg-gray-100'
										>
											Log Out
										</button>
									</div>
								) : (
									<>
										<button
											onClick={() => openLoginForm()}
											className='text-black inline-flex items-center justify-center h-9 px-4 py-2 font-bold'
										>
											Log In
										</button>
										<button
											onClick={() => openSignUpForm()}
											className='text-black inline-flex items-center justify-center h-9 px-4 py-2 font-bold rounded-xl'
										>
											Sign Up
										</button>
									</>
								)}
							</div>
						)}
					</div>
				</div>

				{/* Mobile Menu: only visible below md screen w isMenuOpen */}
				{isMenuOpen && (
					<div className='absolute top-full left-0 w-full hover:text-black bg-white shadow-md flex flex-col items-center gap-4 py-4 md:hidden'>
						<Searchbox />
						<button
							onClick={() =>
								openAuthForm({
									type: 'authentication',
									title: 'logIn',
								})
							}
							className='w-full text-center py-2   font-bold'
						>
							Log In
						</button>
						<button
							onClick={() =>
								openAuthForm({
									type: 'authentication',
									title: 'signUp',
								})
							}
							className='w-full text-center py-2  font-bold'
						>
							Sign Up
						</button>
					</div>
				)}
			</div>

		</div>
	);
};

export default Navbar;

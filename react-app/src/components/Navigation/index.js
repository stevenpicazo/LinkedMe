import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';

function Navigation({ isLoaded }) {
	const history = useHistory();
	const sessionUser = useSelector((state) => state.session.user);

	const [networkClicked, setNetworkClicked] = useState(false);
	const [homeClicked, setHomeClicked] = useState(false);

	const handleSignup = () => {
		history.push('/signup')
	}

	const handleHome = () => {
		history.push('/')
	}

	const handleHomeClick = () => {
		history.push('/feed')
		setHomeClicked(true)
		setNetworkClicked(false)
	}

	const handleNetworkClick = () => {
		history.push('/connections')
		setNetworkClicked(true)
		setHomeClicked(false)
	}

	if (!sessionUser) {
		return (
			<div className="nav-bar-container-new">
				<h1 onClick={handleHome} className="nav-linkedme-logo">
					<span className="nav-logo-section-1">Linked</span>
					<span className="nav-logo-section-2">me</span>
				</h1>
				<div className="nav-login-signup-container">
					<div
						className="nav-socials-container"
						onClick={() =>
							window.open(
								'https://www.linkedin.com/in/steven-picazo-994042225',
								'_blank'
							)
						}
					>
						<div className="socials">
							<i className="fa-solid fa-link"></i>
							<span className="nav-socials-title">LinkedIn</span>
						</div>
						<div className="socials-end" onClick={() => window.open('https://github.com/stevenpicazo')}>
							<i className="fa-brands fa-github"></i>
							<span className="nav-socials-title">Github</span>
						</div>
					</div>
					<div className="nav-border"></div>
					<button className="nav-signup" onClick={handleSignup}>
						Sign Up
					</button>
					<OpenModalButton
						className="nav-login"
						buttonText="Log In"
						modalComponent={<LoginFormModal />}
					/>
				</div>
			</div>
		);
	}

	return (
		<div className="nav-bar-container">
			<div className="linkedme-logo">
				<span className="logo-text">me</span>
			</div>

			{sessionUser && isLoaded && (
				<div className="home-dropdown-container">
					<div className={`fa-network-container ${networkClicked ? 'clicked' : ''}`} onClick={handleNetworkClick}>
						<i className={`fa-solid fa-user-group network-symbol ${networkClicked ? 'clicked' : ''}`}></i>
						<span className={`network-text ${networkClicked ? 'clicked' : ''}`}>
							Network
						</span>
						{networkClicked && <div className="underline"></div>}
					</div>
					<div className={`fa-house-chimney-container ${homeClicked ? 'clicked' : ''}`} onClick={handleHomeClick}>
						<i className={`fa-solid fa-house-chimney ${homeClicked ? 'clicked' : ''}`}></i>
						<span className={`home-text ${homeClicked ? 'clicked' : ''}`}>
							Home
						</span>
						{homeClicked && <div className="nav-underline"></div>}
					</div>
					<ProfileButton user={sessionUser} />
				</div>
			)}
		</div>
	);
}

export default Navigation;

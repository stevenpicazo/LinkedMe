import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

function Navigation({ isLoaded }) {
	const history = useHistory()
	const sessionUser = useSelector(state => state.session.user)
	const [selectedTab, setSelectedTab] = useState(false)

	const handleHomeClick = () => {
		history.push('/feed')
		setSelectedTab(true)
	}

	const handleSignup = () => {
		history.push('/signup')
	}

	const handleHome = () => {
		history.push('/')
	}

	if (!sessionUser) {
		return (
			<div className="nav-bar-container-new">
				<h1 onClick={handleHome} className='nav-linkedme-logo'>
					<span className='nav-logo-section-1'>Linked</span>
					<span className='nav-logo-section-2'>me</span>
				</h1>
				<div className="nav-login-signup-container">
					<div className="nav-socials-container">
						<div className="socials" onClick={() => window.open("https://www.linkedin.com/in/steven-picazo-994042225", "_blank")}>
							<i className="fa-solid fa-link"></i>
							<span className="nav-socials-title">LinkedIn</span>
						</div>
						<div className="socials-end" onClick={() => window.open('https://github.com/stevenpicazo')}>
							<i className="fa-brands fa-github"></i>
							<span className="nav-socials-title">Github</span>
						</div>
					</div>
					<div className="nav-border"></div>
					<button className="nav-signup" onClick={handleSignup}>Sign Up</button>
					<OpenModalButton
						className="nav-login"
						buttonText="Log In"
						modalComponent={<LoginFormModal />}
					/>
				</div>
			</div>
		)
	}

	return (
		<nav className="nav-bar-container">
			<div className="linkedme-logo">
				<span className="logo-text">me</span>
			</div>
			{sessionUser && isLoaded && (
				<ul className="nav-links">
					<li className="nav-item">
						<a href="#home" className="nav-link" onClick={handleHomeClick}>
							<i className="fa-solid fa-house-chimney"></i>
							<span className="home-text">Home</span>
						</a>
					</li>
					<li className="nav-item">
						<ProfileButton user={sessionUser} />
					</li>
				</ul>
			)}
		</nav>
	)
}

export default Navigation;

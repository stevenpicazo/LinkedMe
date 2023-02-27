import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from './logo.png'

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const [selectedTab, setSelectedTab] = useState(false)

	return (
		<div className='nav-bar-container'>
			{/* <img 
			className='linkedme-logo'
			src={logo}/> */}
			<div className='linkedme-logo'>
				<span className='logo-text'>me</span>
			</div>

			{isLoaded && (
				<div className='home-dropdown-container'>
					<div className='fa-house-chimney-container'>
						<i class="fa-solid fa-house-chimney"></i>
						<span className='home-text'>Home<br /></span>
					</div>
					<ProfileButton user={sessionUser} />
					<i class="fa-solid fa-sort-down"></i>
				</div>
			)}
		</div>
	);
}

export default Navigation;

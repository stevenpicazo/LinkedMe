import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const history = useHistory()
	const sessionUser = useSelector(state => state.session.user);
	const [selectedTab, setSelectedTab] = useState(false)

	const homeClick = () => {
		history.push('/feed')
	  }	

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
						{sessionUser && (
							<>
								<i onClick={homeClick} class="fa-solid fa-house-chimney"></i>
								<span className='home-text'>Home<br /></span>
							</>
						)}
					</div>
					<ProfileButton user={sessionUser} />
				</div>
			)}
		</div>
	);
}

export default Navigation;

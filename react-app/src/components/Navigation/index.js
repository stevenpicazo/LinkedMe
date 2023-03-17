import React, { useEffect, useState } from 'react'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ProfileButton from './ProfileButton'
import './Navigation.css'
import OpenModalButton from '../OpenModalButton'
import LoginFormModal from '../LoginFormModal'
import { thunkGetUser, thunkGetUsers } from '../../store/session'

function Navigation({ isLoaded }) {
	const dispatch = useDispatch()
	const history = useHistory()
	const sessionUser = useSelector((state) => state.session.user)
	const allUsers = useSelector((state) => state.session.allUsers)
	const [searchTerm, setSearchTerm] = useState('')
	const [showResults, setShowResults] = useState(false)
	const [filteredUsers, setFilteredUsers] = useState([])


	useEffect(() => {
		dispatch(thunkGetUsers())
	}, [dispatch, isLoaded]);

	const handleHomeClick = () => {
		history.push('/feed')
	}

	const handleSignup = () => {
		history.push('/signup')
	}

	const handleHome = () => {
		history.push('/')
	}


	const handleNetworkClick = () => {
		history.push('/following')
	}

	const handleSearch = (event) => {
		const searchTerm = event.target.value.toLowerCase().trim()
		setSearchTerm(searchTerm)
		if (!searchTerm) {
			setFilteredUsers([])
		} else {
			const filteredUsers = allUsers?.filter((user) => {
				const fullName = `${user?.first_name} ${user?.last_name}`
				return fullName.toLowerCase().includes(searchTerm)
			})
			setFilteredUsers(filteredUsers)
		}
	}

	const truncateSearch = (text, maxLength) => {
		if (!text) {
			return ""
		}
		if (text.length <= maxLength) {
			return text
		}
		const truncatedText = text.slice(0, maxLength)
		const occupationIndex = truncatedText.lastIndexOf('∙') + 2
		const occupation = truncatedText.slice(occupationIndex)
		const occupationWithEllipsis = `${occupation.slice(0, -1)}...`
		const occupationWithClass = `<span class="occupation">${occupationWithEllipsis}</span>`
		return truncatedText.slice(0, occupationIndex) + ' ' + occupationWithClass
	}


	if (!sessionUser) {
		return (
			<div className="nav-bar-container-new">
				<h1 onClick={handleHome} className="nav-linkedme-logo">
					<span className="nav-logo-section-1">Linked</span>
					<span className="nav-logo-section-2">me</span>
				</h1>
				<div className="nav-login-signup-container">
					<div className="nav-socials-container">
						<div className="socials" onClick={() => window.open('https://www.linkedin.com/in/steven-picazo-994042225', '_blank')}>
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
		)
	}

	return (
		<nav className="nav-bar-container">
			<div className="nav-logo-search-container">
				<div onClick={handleHomeClick} className="linkedme-logo">
					<span className="logo-text">me</span>
				</div>
				{sessionUser && isLoaded && (
					<input
						type="text"
						className="search-bar"
						placeholder="Search"
						onChange={handleSearch}
					/>
				)}
				{filteredUsers && isLoaded && (
					<div className='live-search-list' onClick={() => setShowResults(false)}>
						{filteredUsers?.map((user) => (
							<a href={`/profile/${user.id}`} className='search-list-container' onClick={() => setShowResults(false)}>
								<i className="fa-solid fa-magnifying-glass"></i>
								<li dangerouslySetInnerHTML={{
									__html: truncateSearch(
										`${user?.first_name.toLowerCase()} ${user?.last_name.toLowerCase()} ∙ ${user?.occupation}`,
										38),
								}} className="search-list-container" />
								<img className='search-prof-pic' src={user?.profile_picture}></img>
							</a>
						))}
					</div>
				)}
			</div>
			{sessionUser && isLoaded && (
				<ul className="nav-links">
					<li className="nav-item" onClick={handleNetworkClick}>
						<a href="#network" className="nav-link" onClick={handleHomeClick}>
							<i class="fa-solid fa-user-group"></i>
							<span className="home-text">Following</span>
						</a>
					</li>
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
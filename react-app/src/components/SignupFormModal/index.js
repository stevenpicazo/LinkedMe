import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import LoginFormModal from "../LoginFormModal";
import OpenModalButton from "../OpenModalButton";
import "./SignupForm.css";

function SignupFormModal() {
	const history = useHistory();
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [occupation, setOccupation] = useState("");
	const [profilePic, setProfilePic] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password, firstName, lastName, occupation, profilePic));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
				history.push('/feed')
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<div className="signup-page">
			<div className="signup-title">Make the most of your professional life</div>
			<div className="signup-container">
				<form className="signup-form" onSubmit={handleSubmit}>
					<ul className="error-messages">
						{errors.map((error, idx) => (
							<li key={idx}>{error}</li>
						))}
					</ul>
					<div className="signup-label-container">

						<label className="signup-label">
							<span className="signup-label-title">Email</span>
							<input className="signup-input"
								type="text"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</label>
						<label className="signup-label">
							<span className="signup-label-title">Username</span>
							<input className="signup-input"
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
							/>
						</label>
						<label className="signup-label">
							<span className="signup-label-title">First Name</span>
							<input className="signup-input"
								type="text"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								required
							/>
						</label>
						<label className="signup-label">
							<span className="signup-label-title">Last Name</span>
							<input className="signup-input"
								type="text"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								required
							/>
						</label>
						<label className="signup-label">
							<span className="signup-label-title">Occupation</span>
							<input className="signup-input"
								type="text"
								value={occupation}
								onChange={(e) => setOccupation(e.target.value)}
								required
							/>
						</label>
						<label className="signup-label">
							<span className="signup-label-title">Profile Picture</span>
							<input className="signup-input"
								type="url"
								value={profilePic}
								onChange={(e) => setProfilePic(e.target.value)}
								required
							/>
						</label>
						<label className="signup-label">
							<span className="signup-label-title">Password</span>
							<input className="signup-input"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</label>
						<label className="signup-label">
							<span className="signup-label-title">Confirm Password</span>
							<input className="signup-input"
								type="password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
							/>
						</label>
					</div>
					<button className="signup-button" type="submit">Sign Up</button>
					<div className="login-signup-container">
						Already on LinkedMe?
						<OpenModalButton
							className='login-signup-button'
							buttonText="Sign In"
							modalComponent={<LoginFormModal />}
						/>
					</div>
				</form>
			</div>
		</div>
	);
}

export default SignupFormModal;
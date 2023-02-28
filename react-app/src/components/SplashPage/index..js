import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import './SplashPage.css'
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";

function SplashPage() {
    const dispatch = useDispatch();
    const history = useHistory()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        if (data) {
            setErrors(data);
        } else {
            history.push("/feed")
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }

    const demoUser = async (e) => {
        e.preventDefault()
        const data = await dispatch(login('demo@aa.io', 'password'))
        history.push('/feed')
    }


    const handleSignup = () => {
        history.push('/signup')
    }

    return (

        <div className='splash-container'>
            <div className="splash-login-container">
                <div className="splash-section-1">
                    <div className='splash-title'>
                        Welcome to your professional community
                    </div>
                    <form className="splash-login-form" onSubmit={handleSubmit}>
                        <ul>
                            {errors.map((error, idx) => (
                                <li key={idx}>{error}</li>
                            ))}
                        </ul>
                        <div className="input-container">
                            <label className={email ? "splash-login-label active" : "splash-login-label"} htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                className="splash-login-input"
                                placeholder=" "
                                type="email"
                                value={email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="input-container">
                            <label className={password ? "splash-login-label active" : "splash-login-label"} htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                placeholder=" "
                                className="splash-login-input"
                                type="password"
                                value={password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <button className="splash-login-button" type="submit">Sign In</button>
                        <div className="alternate-logins">
                            or
                        </div>
                        <button
                            className="splash-demo-button"
                            type='submit'
                            onClick={(e) => demoUser(e)}
                        >Demo user
                        </button>
                    </form>
                </div>
                <div className="splash-section-2">
                    <img
                        alt="image"
                        className="splash-section-2-img"
                        src="https://static.licdn.com/aero-v1/sc/h/dxf91zhqd2z6b0bwg85ktm5s4">
                    </img>
                </div>
            </div>
            <div className="splash-section-3">
                <img
                    alt="image"
                    src="https://vancomputer.ca/public/img/blog/svg/4.svg"
                    className="splash-section-3-img">
                </img>
                <div className="splash-signup-title">Join your colleagues, classmates, and friends on LinkedMe.</div>

                {/* <button className="splash-signup-button" onClick={handleSignup}>Get Started</button> */}
                <OpenModalButton
                    buttonText="Get Started"
                    // onItemClick={closeMenu}
                    className='splash-signup-button'
                    modalComponent={<SignupFormModal />}

                />
            </div>
        </div>

    )
}

export default SplashPage;

import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { NavLink, useHistory } from "react-router-dom";


function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
      history.push("/feed")
    }
  };

  const demoUser = async (e) => {
    e.preventDefault()
    const data = await dispatch(login('tony@aa.io', 'password'))
    history.push('/feed')
    closeModal()
  }



  return (
    <div className="login-container">
      <div className="login-title">Log in</div>
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <ul className="error-messages">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div className="login-label-container">
            <label className="login-label">
              <span className="login-label-title">Email</span>
              <input
                className="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label className="login-label">
              <span className="login-label-title">Password</span>
              <input
                className="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <button className="login-button" type="submit">Log In</button>
          <div className="alternate-logins">
            or
          </div>
          <button
            className="modal-demo-button"
            onClick={demoUser}
            type='submit'
          >Demo user
          </button>
          <div className="login-signup-container"> 
            Dont have an account yet?
            <NavLink to={'/signup'} onClick={closeModal} className='login-signup-button'>
              Signup
            </NavLink>
            {/* <OpenModalButton
            className='login-signup-button'
              buttonText="Sign Up"
              modalComponent={<SignupFormModal />}
            /> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginFormModal;

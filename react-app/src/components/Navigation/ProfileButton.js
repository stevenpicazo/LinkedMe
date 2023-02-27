import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useHistory } from "react-router-dom";
import './ProfileButton.css'

function ProfileButton({ user }) {
  const history = useHistory()
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <div className="profile-button-container">
        <div className="profile-container">
          <div onClick={openMenu} className="dropdown-icon-container">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png"
              className="dropdown-button">
            </img>

            <div className="me-arrow-down">
              <span className="icon-me">Me</span>
              <i class="fa-solid fa-sort-down"></i>
            </div>
          </div>
          <ul className={ulClassName} ref={ulRef}>
            {user ? (
              <div className="dropdown-menu-container">
                <>
                  <div className="dropdown-content-container">
                    <img className="dropdown-prof-pic" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png"></img>
                    <div>
                      <div className="dropdown-firstname">{user.first_name}</div>
                      <div className="dropdown-occupation">{user.occupation}</div>
                    </div>
                  </div>
                  <div>
                    <span className="dropdown-signout" onClick={handleLogout}>Sign Out</span>
                  </div>
                </>
              </div>
            ) : (
              <>
                <OpenModalButton
                  buttonText="Log In"
                  onItemClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />

                <OpenModalButton
                  buttonText="Sign Up"
                  onItemClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ProfileButton;

import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, thunkGetUser } from "../../store/session";
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
  const sessionUser = useSelector(state => state.session.user)
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


  const truncateName = (name) => {
    const shortName = name?.slice(0, 20)
    return shortName + "..."
  }

  const handleUserProfile = async () => {
    await dispatch(thunkGetUser(sessionUser.id))
    history.push(`/profile/${sessionUser.id}`)
    closeMenu()
  }


  return (
    <>
      <div className="profile-button-container">
        <div className="profile-container">
          <div onClick={openMenu} className="dropdown-icon-container">
            <img
              src={user.profile_picture}
              className="dropdown-button">
            </img>

            <span className="me-arrow-down">
              <span className="icon-me">Me</span>
              <i class="fa-solid fa-sort-down"></i>
            </span>
          </div>
          <ul className={ulClassName} ref={ulRef}>
            {user ? (
              <div className="dropdown-menu-container">
                <>
                  <div className="dropdown-content-container">
                    <img className="dropdown-prof-pic" src={user.profile_picture}></img>
                    <div className="dropdown-fullname">
                      <div className="dropdown-firstname">{user.first_name} {user.last_name}</div>
                      <div className="dropdown-occupation">{truncateName(user.occupation)}</div>
                    </div>
                  </div>
                  <button onClick={handleUserProfile} className="view-profile-button">View Profile</button>
                  <div>
                    <span className="dropdown-signout" onClick={handleLogout}>Sign Out</span>
                  </div>
                </>
              </div>
            ) : (
              null
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ProfileButton;

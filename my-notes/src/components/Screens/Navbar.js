import React, { useContext } from "react";
import "../Styles/navbar.css";
import { Link, useLocation } from "react-router-dom";
import profileContext from "../../context/profilePicFunction/profileContext";
import authContext from "../../context/authentication/authContext";

const Navbar = (prop) => {
  // useLocation
  const location = useLocation();

  const { userData } = useContext(authContext);
  const { imageUrl } = useContext(profileContext);

  return (
    <>
      <div className="mainOfNavbar">
        {/* Logo */}
        <div className="logo">
          {/* <img src="Logo" /> */}
          <h1>
            <Link className="logoImg" to={"/"}>
              My-Notes
            </Link>
          </h1>
        </div>
        {/* Create new Notes */}

        {location.pathname === "/" ? (
          <div className="createNewNotes">
            <span
              className="material-symbols-outlined newNotes"
              id="addNotes"
              onClick={prop.newNotesPage}
            >
              add_circle
            </span>
          </div>
        ) : (
          <div></div>
        )}

        {/* User Profile */}
        {localStorage.getItem("token") ? (
          <div className="userProfile">
            <span className="material-symbols-outlined typicalSize">mail</span>
            <img
              onClick={prop.secondDisplayDecider}
              alt="user"
              src={imageUrl ? imageUrl : userData.userDP}
            />
          </div>
        ) : (
          <div className="loginAndSignupButton">
            <button className="importantBtns">
              <Link className="linkBtns" to={"/login"}>
                Login
              </Link>
            </button>

            <button className="importantBtns">
              <Link className="linkBtns" to={"/signup"}>
                SignUp
              </Link>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;

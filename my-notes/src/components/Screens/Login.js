import React, { useContext, useState } from "react";
import "../Styles/login.css";
import authContext from "../../context/authentication/authContext";
import { Link } from "react-router-dom";

export default function Login() {
  // get login function from authentication folder
  const { login } = useContext(authContext);

  const [credentials, setCredentials] = useState({
    userName: "",
    password: "",
  });

  let handler = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const loggedIn = (e) => {
    e.preventDefault();
    login(credentials.userName, credentials.password);
  };

  return (
    <>
      <div className="LoginBox">
        <div className="innerBox">
          <h1 className="logo">Login</h1>

          <div className="details">
            <form>
              {/* Email input is here */}
              <div className="emailInfo">
                <b>
                  <span className="inputEmail loginHeadingText">User Name</span>
                </b>
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  onChange={handler}
                  value={credentials.userName}
                  required
                />
              </div>

              {/* Password input is here  */}
              <div className="passwordInfo">
                <b>
                  <span className="inputPassword loginHeadingText">
                    Password
                  </span>
                </b>
                <input
                  autoComplete=""
                  type="password"
                  name="password"
                  id="password"
                  onChange={handler}
                  value={credentials.password}
                  required
                />
              </div>
            </form>
          </div>
          <div className="loggingButton">
            <button type="submit" className="ID" onClick={loggedIn}>
              LOGIN
            </button>
            <div className="innerLoggingButton">
              <h5>Forgot Password?</h5>
            </div>
            <h3>Or</h3>
            <hr style={{ width: "100%" }} />
          </div>

          {/* more options to login */}
          <div className="otherOptions">
            <i className="fa fa-google"></i>
            <i className="fa fa-instagram"></i>
            <i className="fa fa-linkedin"></i>
          </div>
          <h4 className="formality">
            Need an account?
            <Link to="/signup">
              <u> SIGN-UP</u>
            </Link>
          </h4>
        </div>
      </div>
    </>
  );
}

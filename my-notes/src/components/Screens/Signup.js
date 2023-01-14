import React, { useContext, useState } from "react";
import "../Styles/signup.css";
import { Link } from "react-router-dom";
import authContext from "../../context/authentication/authContext";

export default function SignUp() {
  // Get sign up function from authentication
  const { signup } = useContext(authContext);

  const [credentials, setCredentials] = useState({
    userName: "",
    phNumber: "",
    email: "",
    password: "",
  });

  let handler = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const createUser = (e) => {
    e.preventDefault();
    signup(
      credentials.userName,
      credentials.phNumber,
      credentials.email,
      credentials.password
    );
  };

  return (
    <>
      <div className="mainContainer">
        <div className="form">
          <div className="allInputs">
            <h1 className="logo">Sign-Up</h1>

            <div className="info">
              {/* user name */}
              <div className="innerBoxData">
                <div className="formsName">
                  <span>
                    <b className="nameOfForm">User Name</b>
                  </span>
                </div>
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  className="inputs"
                  onChange={handler}
                  value={credentials.userName}
                  required
                />
              </div>
            </div>

            <div className="info">
              {/* personal details */}
              <div className="innerBoxData">
                <div className="formsName">
                  <span>
                    <b className="nameOfForm">Phone Number</b>
                  </span>
                </div>
                <input
                  type="text"
                  name="phNumber"
                  id="phNumber"
                  className="inputs"
                  onChange={handler}
                  value={credentials.phNumber}
                  required
                />
              </div>

              <div className="innerBoxData">
                <div className="formsName">
                  <span>
                    <b className="nameOfForm">Email</b>
                  </span>
                </div>
                <input
                  type="email"
                  name="email"
                  id="emailID"
                  className="inputs"
                  onChange={handler}
                  value={credentials.email}
                  required
                />
              </div>
            </div>

            <div className="info">
              {/* very personal data */}
              <div className="innerBoxData">
                <div className="formsName">
                  <span>
                    <b className="nameOfForm">Password</b>
                  </span>
                </div>
                <input
                  type="password"
                  name="password"
                  id="hiddenPassword"
                  className="inputs"
                  onChange={handler}
                  value={credentials.password}
                  required
                />
              </div>
            </div>
            {/* end of form filed */}
            <div>
              <button type="submit" className="ID" onClick={createUser}>
                Create
              </button>
            </div>

            <h4 className="Formality2nd">
              Already have an Account?
              <Link to="/login">
                <u>Login</u>
              </Link>
            </h4>
          </div>
        </div>
      </div>
    </>
  );
}

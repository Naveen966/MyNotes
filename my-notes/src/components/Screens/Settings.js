import React, { useContext } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "../Styles/settings.css";
import noteWritingPageContext from "../../context/appFunctionalities/noteWritingPageContext";
import noteContext from "../../context/noteContext/noteContext";
import profileContext from "../../context/profilePicFunction/profileContext";

function Settings(prop) {
  const navigate = useNavigate();
  const location = useLocation();

  const { setNotes } = useContext(noteContext);

  // setting remover on logged-out
  const { secondDisplayDecider, setDisplay } = useContext(
    noteWritingPageContext
  );

  const dataPreLoader = () => {
    localStorage.removeItem("token");
    navigate("/login");
    secondDisplayDecider();
    setNotes([]);
  };

  // Profile context
  const { setScreenProperty } = useContext(profileContext);

  return (
    <>
      <div id="mainSettingBox" style={{ display: prop.displayDetails }}>
        <div className="innerMainSettings">
          <Link
            to={location.pathname === "/profile" ? "/" : "/profile"}
            style={{ textDecoration: "none" }}
          >
            <h3
              className="options"
              onClick={() => {
                setDisplay("none");
                setTimeout(() => {
                  setScreenProperty("none");
                }, 0.000001);
              }}
            >
              <span className="material-symbols-outlined">account_circle</span>
              &nbsp; {location.pathname === "/profile" ? "Home" : "Profile"}
            </h3>
          </Link>
          <h3 className="options">
            <span className="material-symbols-outlined">dataset_linked</span>
            &nbsp; Linked Devices
          </h3>
          <h3 className="options">
            <span className="material-symbols-outlined">settings_suggest</span>
            &nbsp; Advance
          </h3>
          <h3 className="options" onClick={dataPreLoader}>
            <span className="material-symbols-outlined">settings_suggest</span>
            &nbsp; Logout
          </h3>
        </div>
      </div>
    </>
  );
}

export default Settings;

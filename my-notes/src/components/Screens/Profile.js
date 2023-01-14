import React, { useContext, useEffect, useRef } from "react";
import "../Styles/profile.css";
import Settings from "./Settings";
import authContext from "../../context/authentication/authContext";
import noteContext from "../../context/noteContext/noteContext";
import profileContext from "../../context/profilePicFunction/profileContext";

const ProfilePage = (prop) => {
  const { getUser, userData, userDP } = useContext(authContext);
  const { setNotes } = useContext(noteContext);
  const {
    changeImage,
    image,
    imageUrl,
    imageChooser,
    screenProperty,
    setScreenProperty,
  } = useContext(profileContext);

  useEffect(() => {
    getUser();
    setNotes([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // model shower
  const dpChangerBox = () => {
    screenProperty === "none"
      ? setScreenProperty("flex")
      : setScreenProperty("none");
  };

  // Open image input
  const handleImage = useRef(null);
  const displayImage = () => {
    handleImage.current.click();
  };

  useEffect(() => {
    if (image) {
      changeImage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  useEffect(() => {
    if (imageUrl) {
      userDP(imageUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

  return (
    <>
      {/* Model */}
      <div className="upperLayer" style={{ display: screenProperty }}>
        <div className="profileOptionContainer">
          <div className="profileModelCut">
            <span onClick={dpChangerBox} className="material-symbols-outlined">
              close
            </span>
          </div>
          <h1 style={{ fontSize: "2rem" }}>Update Profile Photo</h1>
          <div className="profileInnerOption">
            <div className="profileOptionsHead">
              <button className="btnOfChangeDP" onClick={displayImage}>
                Upload Photo
              </button>
              <input
                ref={handleImage}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={imageChooser}
              />
            </div>
            <div className="profileOptionsHead">
              <button className="btnOfChangeDP" style={{ color: "#e20000" }}>
                Remove Current Photo
              </button>
            </div>
            <div className="profileOptionsHead">
              <button
                className="btnOfChangeDP"
                onClick={dpChangerBox}
                style={{ color: "#1b1b1bcc" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* end of model */}

      <Settings displayDetails={prop.displayDetails} />
      <div className="profile-page">
        <div className="profile-picture">
          <img
            src={imageUrl ? imageUrl : userData.userDP}
            alt="Profile"
            onClick={dpChangerBox}
          />
        </div>
        <h1>{userData.userName}</h1>
        <p>
          <b>{userData.phoneNumber}</b>
        </p>
        <p>
          <b>{userData.email}</b>
        </p>
        <p>Bio:</p>
      </div>
    </>
  );
};

export default ProfilePage;

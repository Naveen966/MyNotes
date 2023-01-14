import React, { useState } from "react";
import profileContext from "./profileContext";

const ProfileImage = (props) => {
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const imageChooser = (e) => {
    setImage(e.target.files[0]);
    // console.log(image);
  };

  // upload pic
  const changeImage = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Profile-Pic");
    data.append("cloud_Name", "dryxmplj4");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dryxmplj4/image/upload",
      { method: "POST", body: data }
    );

    const ImageData = await res.json();
    setImageUrl(ImageData.secure_url);
  };

  // model shower
  const [screenProperty, setScreenProperty] = useState("none");
  return (
    <profileContext.Provider
      value={{
        changeImage,
        image,
        imageUrl,
        imageChooser,
        screenProperty,
        setScreenProperty,
      }}
    >
      {props.children}
    </profileContext.Provider>
  );
};

export default ProfileImage;

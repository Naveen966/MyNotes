import React, { useState } from "react";
import noteWritingPageContext from "./noteWritingPageContext";

const NoteWritingPage = (props) => {
  // Note writer page
  let [display, setDisplay] = useState("none");
  let [opacity, setOpacity] = useState(0);
  function displayDecider() {
    if (display === "none") {
      // to get fade effect
      setTimeout(() => {
        setOpacity(1);
      }, 150);

      // main logic
      setDisplay("block");
      document.getElementById("addNotes").style.transform = "rotate(45deg)";
    } else {
      // main logic
      setTimeout(() => {
        setDisplay("none");
        document.getElementById("addNotes").style.transform = "rotate(360deg)";
      }, 500);

      // to get fade effect
      setOpacity(0);
    }
  }

  // Setting component showing
  const [displayDetails, setDisplayDetails] = useState("none");
  function secondDisplayDecider() {
    if (displayDetails === "block") {
      setDisplayDetails("none");
    } else {
      setTimeout(() => {
        setDisplayDetails("block");
      }, 150);
    }
  }

  // NoteViewer Display Decider function
  const [displayProperty, setDisplayProperty] = useState("none");
  const noteViewerDisplayDecider = () => {
    displayProperty === "none"
      ? setDisplayProperty("flex")
      : setDisplayProperty("none");
  };

  // Deletion Page Warning Shower
  const [deletionDisplayProperty, setDeletionDisplayProperty] =
    useState("none");
  function deletionPageDisplayDecider() {
    deletionDisplayProperty === "none"
      ? setDeletionDisplayProperty("flex")
      : setDeletionDisplayProperty("none");
  }

  return (
    <noteWritingPageContext.Provider
      value={{
        displayDecider,
        opacity,
        display,
        secondDisplayDecider,
        displayDetails,
        setDisplay,
        noteViewerDisplayDecider,
        displayProperty,
        deletionPageDisplayDecider,
        deletionDisplayProperty,
        setDeletionDisplayProperty,
      }}
    >
      {props.children}
    </noteWritingPageContext.Provider>
  );
};

export default NoteWritingPage;

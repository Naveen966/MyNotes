import React, { useContext } from "react";
import "./App.css";
import noteWritingPageContext from "./context/appFunctionalities/noteWritingPageContext";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Screens/Navbar";
import MainContent from "./components/Screens/MainContent";
import Login from "./components/Screens/Login";
import Signup from "./components/Screens/Signup";
import Profile from "./components/Screens/Profile";
import DataEntry from "./components/Screens/DataEntry";
import Footer from "./components/Screens/Footer";

function App() {
  // Note Writing Page Face Functionality
  const {
    displayDecider,
    opacity,
    display,
    secondDisplayDecider,
    displayDetails,
  } = useContext(noteWritingPageContext);

  return (
    <>
      <div>
        <Navbar
          newNotesPage={displayDecider}
          secondDisplayDecider={secondDisplayDecider}
        />
        <div className="notesWriterBox">
          <Routes>
            <Route
              exact
              path="/"
              element={<MainContent displayDetails={displayDetails} />}
            />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />

            {/* Profile page */}
            <Route
              exact
              path="/profile"
              element={<Profile displayDetails={displayDetails} />}
            />
          </Routes>
          <DataEntry opacityOfDataPage={opacity} displayProperty={display} />
        </div>
        <ToastContainer />
      </div>
      <Footer />
    </>
  );
}

export default App;

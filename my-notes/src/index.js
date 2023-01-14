import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import NoteInfo from "./context/noteContext/NoteInfo";
import NoteWritingPage from "./context/appFunctionalities/NoteWritingPage";
import AuthInfo from "./context/authentication/AuthInfo";
import ProfileImage from "./context/profilePicFunction/ProfileImage";
// import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthInfo>
        <ProfileImage>
          <NoteWritingPage>
            <NoteInfo>
              <App />
            </NoteInfo>
          </NoteWritingPage>
        </ProfileImage>
      </AuthInfo>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

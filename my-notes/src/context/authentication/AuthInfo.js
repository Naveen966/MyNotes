import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authContext from "./authContext";
import { toast } from "react-toastify";

const AuthInfo = (props) => {
  const navigate = useNavigate();
  // const host = "http://localhost:5000/";

  const notifyA = (success) => toast.success(success);
  const notifyB = (error) => toast.error(error);

  // regex credentials checker
  const emailTester =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const passwordsTester =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // singUp user
  const signup = async (userName, phoneNumber, email, password) => {
    if (passwordsTester.test(password) && emailTester.test(email)) {
      const res = await fetch(`/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userName,
          phoneNumber: phoneNumber,
          email: email,
          password: password,
        }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.success);
        navigate("/");
        notifyA(data.msg);
      } else if (data.errors) {
        notifyB(data.errors[0].msg);
      } else {
        notifyB(data.error);
      }
    }
    if (!passwordsTester.test(password))
      notifyB(
        "Password must be have : Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      );
    if (!emailTester.test(email)) notifyB("Try with a valid email");
  };


  // login user
  const login = async (userName, password) => {
    const res = await fetch(`/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        userName: userName,
        password: password,
      }),
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("token", data.success);
      navigate("/");
      notifyA(data.msg);
    } else if (data.errors) {
      notifyB(data.errors[0].msg);
    } else {
      notifyB(data.error);
    }
  };

  // login user
  const userDP = async (url) => {
    const res = await fetch(`/api/auth/userpic`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        userDP: url,
      }),
    });

    const data = await res.json();

    if (data.success) {
      notifyA(data.msg);
    } else {
      notifyB(data.error);
    }
  };

  // Get user personal data
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
  });
  const getUser = async () => {
    const res = await fetch(`/api/auth/getuser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const data = await res.json();
    setUserData(data);
  };

  return (
    <authContext.Provider value={{ userData, getUser, signup, login, userDP }}>
      {props.children}
    </authContext.Provider>
  );
};

export default AuthInfo;

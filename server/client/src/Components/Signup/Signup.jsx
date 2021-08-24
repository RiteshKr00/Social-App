import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Toast from "../Toast/Toast";
import styles from "./SignUp.module.css";
const axios = require("axios");

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);
  const [imgName, setImgName] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (url) {
      Register();
    }
  }, [url]);

  const UploadImg = () => {
    const postImage = new FormData();
    postImage.append("file", image);
    postImage.append("upload_preset", "SocialApp");
    postImage.append("cloud_name", "slowgeek");
    console.log(postImage);
    //replace it with axios
    fetch(" https://api.cloudinary.com/v1_1/slowgeek/image/upload", {
      method: "POST",
      body: postImage,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setUrl(result.url);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const Register = async () => {
    try {
      if (username.length < 3 || username.length > 15) {
        Toast("Name length be from 3 to 15 characters", 2);
        return;
      }
      if (
        !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          email
        )
      ) {
        Toast("Invalid Email", 2);
        return;
      }
      if (password.length < 5) {
        Toast("Length of the password must be at least 5", 2);
        return;
      }

      const response = await axios.post("/signup", {
        username: username,
        email: email,
        password: password,
        pic: url,
      });
      console.log(response);
      console.log(response.data);
      history.push("/login");
      Toast(response.data.message, 1);
    } catch (err) {
      console.log(err.response.data);
      Toast(err.response.data.error, 2);
      Toast(err.response.data.message, 2);
    }
  };

  const handleSignup = () => {
    if (image) {
      UploadImg();
    } else {
      Register();
    }
  };

  return (
    <div className="h-screen">
      <div
        className={`bg-gradient-to-r from-green-200 to-blue-200 flex bg-gray-100 py-8 ${styles}`}
      >
        <div className="w-full max-w-md bg-gradient-to-br from-green-400 to-blue-500 m-auto rounded-lg border border-gray-200 shadow-lg py-10 px-10 md:px-20">
          <h2 className="text-2xl text-center pt-4 pb-5 text-primary	">
            Social App
          </h2>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={
                "w-full p-2 text-primary rounded-md transition duration-150 ease-in-out mb-4"
              }
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={
                "w-full  p-2 text-primary rounded-md transition duration-150 ease-in-out mb-4"
              }
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={
                "w-full  p-2 text-primary rounded-md transition duration-150 ease-in-out mb-4"
              }
            />
          </div>
          <div className="w-full">
            <h1 className="p-2 my-1">Choose Profile Picture :</h1>
            <label
              for="pic-upload"
              className="text-center bg-indigo-400 text-white p-2 my-5 rounded-md "
            >
              {imgName ? imgName.substring(0, 30) : "Upload Pic"}
            </label>
            <input
              id="pic-upload"
              type="file"
              accept="image/*"
              className="hidden outline-none my-2 py-2 border-b-4"
              onChange={(e) => {
                setImage(e.target.files[0]);
                setImgName(e.target.files[0].name);
              }}
            />
          </div>
          <div className="flex justify-center item-center">
            <button
              id="signup"
              type="submit"
              className={
                "my-4 py-2 px-4 text-white rounded bg-gray-700 hover:bg-gray-800  active:border-black"
              }
              onClick={() => handleSignup()}
            >
              Signup
            </button>
          </div>{" "}
          <div className="py-2 flex justify-center item-center">
            <h2>
              Already have an account ?
              <Link
                to="/login"
                className="text-gray-300  hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

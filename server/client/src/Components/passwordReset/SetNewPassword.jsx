import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Toast from "../Toast/Toast";
const axios = require("axios");

const SetNewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const history = useHistory();
  console.log(token);
  const Reset = async () => {
    try {
      if (password.length < 5) {
        Toast("Length of the password must be at least 5", 2);
        return;
      }
      if (password !== confirmPassword) {
        Toast("Password do not match", 2);
        return;
      }
      const response = await axios.post("/newpassword", {
        password: password,
        token: token,
      });
      console.log(response);
      console.log(response.data);
      history.push("/login");
      Toast(response.data, 1);
    } catch (err) {
      console.log(err.response.data);
      Toast(err.response.data.error, 2);
      Toast(err.response.data.message, 2);
    }
  };
  return (
    <div className="h-screen">
      <div
        className={
          "bg-gradient-to-r from-green-200 to-blue-200 flex bg-gray-100 py-8 "
        }
      >
        <div className="w-full max-w-md bg-gradient-to-br from-green-400 to-blue-500 m-auto rounded-lg border border-gray-200 shadow-lg py-10 px-10 md:px-20">
          <h2 className="text-2xl text-center pt-4 pb-5 text-primary	">
            Social App
          </h2>
          <div>
            <input
              type="password"
              placeholder="Enter New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={
                "w-full  p-2 text-primary rounded-md transition duration-150 ease-in-out mb-4"
              }
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={
                "w-full  p-2 text-primary rounded-md transition duration-150 ease-in-out mb-4"
              }
            />
          </div>
          <div className="flex justify-center item-center">
            <button
              type="submit"
              className={
                "my-4 py-2 px-4 text-white rounded bg-gray-700 hover:bg-gray-800  active:border-black"
              }
              onClick={() => Reset()}
            >
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetNewPassword;

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Toast from "../Toast/Toast";
const axios = require("axios");
const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const history = useHistory();
  const SendLink = async () => {
    try {
      if (
        !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          email
        )
      ) {
        Toast("Invalid Email", 2);
        return;
      }
      const response = await axios.post("/resetpassword", {
        email: email,
      });

      history.push("/login");
      Toast(response.data, 1);
    } catch (err) {
      Toast(err.response.data.error, 2);
      Toast(err.response.data.message, 2);
    }
  };
  return (
    <div className="h-screen">
      <div className="bg-gradient-to-r from-green-200 to-blue-200 flex bg-gray-100 py-8">
        <div className="w-full max-w-md bg-gradient-to-br from-green-400 to-blue-500 m-auto rounded-lg border border-gray-200 shadow-lg py-10 px-10 md:px-20">
          <h2 className="text-2xl text-center pt-4 pb-5 text-primary	">
            Social App
          </h2>
          <>
            <div className="text-center">
              <input
                type="text"
                id="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={
                  "w-full p-2 text-primary rounded-md transition duration-150 ease-in-out mb-4"
                }
              />
            </div>

            <div className="flex justify-center item-center">
              <button
                type="submit"
                onClick={() => SendLink()}
                className={
                  "py-2 px-4 text-white rounded bg-gray-700 hover:bg-gray-800  active:border-black"
                }
              >
                Reset Password
              </button>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;

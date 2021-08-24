import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Toast from "../Toast/Toast";
import { userAdded } from "../../reducers/usersSlice";
const axios = require("axios");
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const DoLogin = async () => {
    try {
      const response = await axios.post("/signin", {
        username: username,
        password: password,
      });
      console.log(response);
      console.log(response.data);
      localStorage.setItem("loggedUser", JSON.stringify(response.data));
      console.log(response.data);
      const users = response.data;
      delete users.accessToken;
      dispatch(userAdded(users));
      history.push("/");
      Toast("Logged In Successfully", 1);
    } catch (err) {
      //comment  before deploying
      console.log(err);
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

            <div className="flex justify-center item-center">
              <button
                id="signup"
                type="submit"
                onClick={() => DoLogin()}
                className={
                  "py-2 px-4 text-white rounded bg-gray-700 hover:bg-gray-800  active:border-black"
                }
              >
                Login
              </button>
            </div>
            <div className="py-2 flex justify-center item-center">
              <h2>
                Don't have an account ?
                <Link
                  to="/signup"
                  className="text-gray-300  hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  SignUp
                </Link>
              </h2>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default Login;

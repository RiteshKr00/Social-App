import React from "react";

const Login = () => {
  return (
    <div className="flex bg-gray-100 py-8">
      <div className="w-full max-w-md bg-gradient-to-br from-green-400 to-blue-500 m-auto rounded-lg border border-gray-200 shadow-lg py-10 px-10 md:px-20">
        <h2 className="text-2xl text-center pt-4 pb-5 text-primary	">
          Social App
        </h2>
        <form>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Your Username"
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
              className={
                "w-full  p-2 text-primary rounded-md transition duration-150 ease-in-out mb-4"
              }
            />
          </div>

          <div className="flex justify-center item-center">
            <button
              id="signup"
              type="submit"
              className={
                "py-2 px-4 text-white rounded bg-gray-700 hover:bg-gray-800  active:border-black"
              }
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

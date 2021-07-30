import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import "./App.css";
import CreatePost from "./Components/CreatePost/CreatePost";
import Home from "./Components/Home/Home";
import Profile from "./Components/Profile/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Route exact path="/">
        <Home />
      </Route>{" "}
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/createpost">
        <CreatePost />
      </Route>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;

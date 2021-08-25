import React, { useEffect } from "react";
import { BrowserRouter, Route, useHistory, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import axios from "axios";
import "./App.css";
import CreatePost from "./Components/CreatePost/CreatePost";
import Home from "./Components/Home/Home";
import Profile from "./Components/Profile/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userAdded } from "./reducers/usersSlice";
import UserProfile from "./Components/UserProfile/UserProfile";
import ForgetPassword from "./Components/passwordReset/ForgetPassword";
import SetNewPassword from "./Components/passwordReset/SetNewPassword";
const Routes = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    const users = user;
    if (users) delete users.accessToken;
    dispatch(userAdded(user));
    if (!user) {
      if (!history.location.pathname.startsWith("/resetpassword")) {
        history.push("/login");
      }
    }
  }, []);
  return (
    <Switch>
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
      <Route path="/profile/:userId">
        <UserProfile />
      </Route>
      <Route exact path="/resetpassword">
        <ForgetPassword />
      </Route>
      <Route path="/resetpassword/:token">
        <SetNewPassword />
      </Route>
    </Switch>
  );
};
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;

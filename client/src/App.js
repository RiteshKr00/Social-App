import React, { useEffect } from "react";
import { BrowserRouter, Route, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import "./App.css";
import CreatePost from "./Components/CreatePost/CreatePost";
import Home from "./Components/Home/Home";
import Profile from "./Components/Profile/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userAdded } from "./reducers/usersSlice";
const Routes = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    dispatch(userAdded(user));
    if (!user) {
      history.push("/login");
    }
  }, []);
  return (
    <switch>
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
    </switch>
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

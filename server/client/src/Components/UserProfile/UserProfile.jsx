import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Profile from "../Profile/Profile";
import Toast from "../Toast/Toast";
import { useDispatch } from "react-redux";
import { userDetailUpdated } from "../../reducers/usersSlice";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [showFollow, setshowFollow] = useState(true);
  const { userId } = useParams();
  const dispatch = useDispatch();
  const fetchpost = async (userId) => {
    try {
      if (JSON.parse(localStorage.getItem("loggedUser"))) {
        const userDetails = await axios.get(`/user/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": JSON.parse(localStorage.getItem("loggedUser"))
              .accessToken,
          },
        });
        console.log(userDetails.data);

        setProfile(userDetails.data);
        console.log(profile);
      }
    } catch (err) {
      //comment  before deploying
      console.log(err);
      console.log(err.response);
      Toast(err.response.data.error, 2);
      Toast(err.response.data.message, 2);
    }
  };

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (loggedUser.following.includes(userId)) {
      setshowFollow(false);
    } else {
      setshowFollow(true);
    }
    fetchpost(userId);
  }, [showFollow]);

  const followUser = async (followId) => {
    try {
      const userDetails = await axios({
        url: "/follow",
        method: "put",
        data: { followId },
        headers: {
          "Content-Type": "application/json",
          "x-access-token": JSON.parse(localStorage.getItem("loggedUser"))
            .accessToken,
        },
      });
      dispatch(userDetailUpdated(userDetails.data.userHimself));
      //updating local storage-------------------------
      const logged = JSON.parse(localStorage.getItem("loggedUser"));
      const updateLocalStorage = userDetails.data.userHimself;
      const newlogged = {
        ...logged,
        followers: updateLocalStorage.followers,
        following: updateLocalStorage.following,
        post: updateLocalStorage.post,
      };
      localStorage.setItem("loggedUser", JSON.stringify(newlogged));
      //------------------------------------------------
      const newDetails = userDetails.data.userFollowed;
      console.log(newDetails);
      setProfile((prevState) => {
        console.log(prevState);
        return { ...prevState, user: newDetails };
      });
      console.log(userDetails);
      setshowFollow(false);
    } catch (err) {
      //comment  before deploying
      console.log(err);
      console.log(err.response);
      Toast(err.response.data.error, 2);
      Toast(err.response.data.message, 2);
    }
  };
  const unfollowUser = async (followId) => {
    try {
      const userDetails = await axios({
        url: "/unfollow",
        method: "put",
        data: { followId },
        headers: {
          "Content-Type": "application/json",
          "x-access-token": JSON.parse(localStorage.getItem("loggedUser"))
            .accessToken,
        },
      });
      dispatch(userDetailUpdated(userDetails.data.userHimself));
      //updating local storage-------------------------
      const logged = JSON.parse(localStorage.getItem("loggedUser"));
      const updateLocalStorage = userDetails.data.userHimself;
      const newlogged = {
        ...logged,
        followers: updateLocalStorage.followers,
        following: updateLocalStorage.following,
        post: updateLocalStorage.post,
      };
      localStorage.setItem("loggedUser", JSON.stringify(newlogged));
      //------------------------------------------------
      const newDetails = userDetails.data.userUnfollowed;
      setProfile((prevState) => {
        console.log(prevState);
        return { ...prevState, user: newDetails };
      });
      console.log(showFollow);
      setshowFollow(true);
      console.log(showFollow);
    } catch (err) {
      //comment  before deploying
      console.log(err);
      console.log(err.response);
      Toast(err.response.data.error, 2);
      Toast(err.response.data.message, 2);
    }
  };
  return (
    <>
      {profile ? (
        <div className="mx-10 h-screen">
          <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-xl p-6 flex flex-wrap content-around my-9 border-b-4">
            <div>
              <img
                className="rounded-full h-48 w-48"
                src={profile.user.pic}
                alt="profileImg"
              ></img>
            </div>
            <div className="mx-8">
              <h1 className="font-bold">{profile.user.username}</h1>
              <h3>{profile.user.email}</h3>

              <div className="flex flex-row py-3">
                <h6 className="px-2">{profile.post.length} Post</h6>
                <h6 className="px-2">
                  {profile.user.followers.length} followers
                </h6>
                <h6 className="px-2">
                  {profile.user.following.length} following
                </h6>
              </div>
              <div>
                {showFollow ? (
                  <button
                    onClick={(f) => followUser(profile.user._id)}
                    className="text-gray-300 bg-blue-500 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Follow
                  </button>
                ) : (
                  <button
                    onClick={(f) => unfollowUser(profile.user._id)}
                    className="text-gray-300 bg-blue-500 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    UnFollow
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-400 to-blue-500 justify-center rounded-xl p-6 flex flex-wrap content-around my-9 border-b-4">
            <h1 className="font-bold text-2xl py-2 ">My Posts</h1>
            <div className="flex justify-center item-center">
              <div className="grid grid-cols-3 gap-4 px-12 h-4/5 w-4/5">
                {profile.post.map((item) => {
                  console.log(typeof item._id);
                  return (
                    <img
                      key={item._id}
                      className=" border-4 border-gray-900 h-full w-full"
                      src={item.photo}
                      alt="profile"
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h2>Loading ...</h2>
      )}
    </>
  );
};

export default UserProfile;

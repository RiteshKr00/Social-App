import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UploadIcon } from "@heroicons/react/outline";
import { userDetailUpdated } from "../../reducers/usersSlice";
import axios from "axios";
import Toast from "../Toast/Toast";
const Profile = () => {
  const dispatch = useDispatch();
  const [post, setPost] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [url, setUrl] = useState("");
  const users = useSelector((state) => state.users);
  const fetchmypost = async () => {
    try {
      if (JSON.parse(localStorage.getItem("loggedUser"))) {
        const posts = await axios.get("/mypost", {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": JSON.parse(localStorage.getItem("loggedUser"))
              .accessToken,
          },
        });
        console.log(posts.data.posts);

        console.log(typeof posts.data.posts);
        setPost(posts.data.posts);
        console.log(post);
      }
    } catch (err) {
      //comment  before deploying
      console.log(err);
      // Toast(err.response.data.error, 2);
      // Toast(err.response.data.message, 2);
    }
  };
  const UpdateProfilePic = () => {
    const postImage = new FormData();
    postImage.append("file", image.raw);
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
  const handleChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
      setShowUpload(true);
    }
  };
  const updateProfileImage = async () => {
    try {
      console.log("Updated");
      const response = await axios.put(
        "/updatepic",
        {
          pic: url,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": JSON.parse(localStorage.getItem("loggedUser"))
              .accessToken,
          },
        }
      );
      dispatch(userDetailUpdated(response.data));
      const logged = JSON.parse(localStorage.getItem("loggedUser"));
      const updateLocalStorage = response.data;
      const newlogged = {
        ...logged,
        pic: updateLocalStorage.pic,
      };
      localStorage.setItem("loggedUser", JSON.stringify(newlogged));
      //------------------------------------------------
      console.log(response);
      console.log(response.data);
      setShowUpload(false);
      // //history.push("/");
      Toast("Updated Profile Picture", 1);
    } catch (err) {
      console.log(err.response.data);
      console.log("this");
      Toast(err.response.data.error, 2);
    }
  };
  useEffect(() => {
    fetchmypost();
  }, []);
  useEffect(() => {
    if (url) {
      updateProfileImage();
    }
  }, [url]);
  return (
    <div className="mx-10 h-screen">
      <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-xl p-6 flex flex-wrap content-around my-9 border-b-4">
        <div className="relative">
          <label htmlFor="upload-button">
            {image.preview ? (
              <img
                src={image.preview}
                alt="profile_Preview"
                className="rounded-full h-48 w-48"
              />
            ) : (
              <>
                <img
                  className="rounded-full h-48 w-48"
                  src={users ? users.pic : ""}
                  alt="profile"
                ></img>
              </>
            )}
          </label>
          <div
            onClick={UpdateProfilePic}
            className={`${
              showUpload ? "" : "hidden"
            } z-50 bg-gradient-to-r hover:from-green-400 hover:to-blue-500 from-pink-500 to-yellow-500 absolute bottom-4 right-4 rounded-full h-6 w-6`}
          >
            <UploadIcon />
          </div>
          <input
            type="file"
            id="upload-button"
            style={{ display: "none" }}
            onChange={handleChange}
          />
        </div>
        <div className="mx-8">
          <h1>{users.username}</h1>

          <div className="flex flex-row py-3">
            <h6 className="px-2">{post.length} Post</h6>
            <h6 className="px-2">
              {users.followers ? users.followers.length : "0"} followers
            </h6>
            <h6 className="px-2">
              {users.following ? users.following.length : "0"} following
            </h6>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-green-400 to-blue-500 justify-center rounded-xl p-6 flex flex-wrap content-around my-9 border-b-4">
        <h1 className="font-bold text-2xl py-2 ">My Posts</h1>
        <div className="flex justify-center item-center">
          <div className="grid grid-cols-3 gap-4 px-12 h-4/5 w-4/5">
            {post.map((pics) => {
              return (
                <img
                  key={pics._id}
                  className=" border-4 border-gray-900 h-full w-full"
                  src={pics.photo}
                  alt="profile"
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

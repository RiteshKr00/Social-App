import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Toast from "../Toast/Toast";
const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [imgName, setImgName] = useState(null);
  const history = useHistory();
  //we can also use file reader in case we want preview of img
  const UploadPost = () => {
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

  const uploadPostWithImg = async () => {
    try {
      const response = await axios.post(
        "/createpost",
        {
          title,
          body,
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
      console.log(response);
      console.log(JSON.parse(localStorage.getItem("loggedUser")).accessToken);
      console.log(response.data);
      history.push("/");
      Toast("CreatedPost successfully", 1);
    } catch (err) {
      console.log(err.response.data);
      console.log("this");
      Toast(err.response.data.error, 2);
    }
  };
  useEffect(() => {
    if (url) {
      uploadPostWithImg();
    }
  }, [url]);
  return (
    <div className="h-screen">
      <div className="bg-gradient-to-r from-green-200 to-blue-200 flex bg-gray-100 py-8">
        <div className="bg-gradient-to-r from-green-400 to-blue-500 w-full h-full max-w-md m-auto rounded-lg bg-white border border-gray-200 shadow-lg py-10 px-10 md:px-20">
          <h2 className="text-2xl text-center pt-4 pb-5 text-primary	">
            Create Post
          </h2>

          <input
            type="text"
            id="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gradient-to-r from-green-200 to-blue-200 outline-none w-full my-2 py-2 border-b-4"
          />

          <textarea
            type="text"
            id="body"
            placeholder="Description"
            value={body}
            rows={4}
            onChange={(e) => {
              setBody(e.target.value);
            }}
            className="rounded bg-gradient-to-r from-green-200 to-blue-200 outline-none w-full my-2 py-2 border-b-4"
          />
          
          <input
            type="file"
            accept="image/*"
            className="outline-none w-full my-2 py-2 border-b-4"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <div className="flex justify-center item-center">
            <button
              className={
                "my-4 py-2 px-4 text-white rounded bg-gray-700 hover:bg-gray-800  active:border-black"
              }
              onClick={() => UploadPost()}
            >
              Create Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;

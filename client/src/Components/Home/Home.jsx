import React, { useEffect, useState } from "react";
import { HeartIcon } from "@heroicons/react/solid";
import { useHistory } from "react-router-dom";
import axios from "axios";
const Home = () => {
  const history = useHistory();
  const [post, setPost] = useState([]);
  const fetchpost = async () => {
    try {
      if (JSON.parse(localStorage.getItem("loggedUser"))) {
        const posts = await axios.get("/allpost", {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": JSON.parse(localStorage.getItem("loggedUser"))
              .accessToken,
          },
        });
        console.log(posts.data.posts);
        
        console.log(typeof(posts.data.posts));
        setPost(posts.data.posts);
      }
    } catch (err) {
      //comment  before deploying
      console.log(err);
      // Toast(err.response.data.error, 2);
      // Toast(err.response.data.message, 2);
    }
  };

  useEffect(() => {
    fetchpost();
  }, []);

  return (
    <div className=" mx-10 flex flex-col px-auto md:px-24 lg:px-56">
      {post.map(item=>{
        return (<div className="border-4 border-purple-200 my-2 justify-center" key={item._id}>
        <h1>{item.postedBy.username}</h1>
        <div>
          <img
            className="w-full "
            src={item.photo}
            alt="profile"
          />
        </div>
        <div className="px-2 py-2">
          <HeartIcon className="h-5 w-5 text-blue-500" />
          <h5>{item.title}</h5>
          <p>{item.body}</p>
          <input
            className="outline-none w-full border-b-4"
            type="text"
            placeholder="Add a comment"
          ></input>
        </div>
      </div>)
      })}
      <div className="border-4 border-purple-200 my-2 justify-center">
        <h1>Ram</h1>
        <div>
          <img
            className="w-full "
            src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
            alt="profile"
          />
        </div>
        <div className="px-2 py-2">
          <HeartIcon className="h-5 w-5 text-blue-500" />
          <h5>title</h5>
          <p>comment is comment</p>
          <input
            className="outline-none w-full border-b-4"
            type="text"
            placeholder="Add a comment"
          ></input>
        </div>
      </div>
      <div className="border-4 border-purple-200 my-2 justify-center">
        <h1>Ram</h1>
        <div>
          <img
            className="w-full "
            src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
            alt="profile"
          />
        </div>
        <div className="px-2 py-2">
          <HeartIcon className="h-5 w-5 text-blue-500" />
          <h5>title</h5>
          <p>comment is comment</p>
          <input
            className="outline-none w-full border-b-4"
            type="text"
            placeholder="Add a comment"
          ></input>
        </div>
      </div>
    </div>
  );
};

export default Home;

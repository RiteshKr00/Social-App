import React, { useEffect, useState } from "react";
import {
  HeartIcon,
  ThumbUpIcon,
  ThumbDownIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Toast from "../Toast/Toast";
const Home = () => {
  const history = useHistory();
  const users = useSelector((state) => state.users);
  console.log(users.id);
  //add red color on like
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

        //console.log(typeof posts.data.posts);
        setPost(posts.data.posts);
      }
    } catch (err) {
      //comment  before deploying
      console.log(err);
      console.log(err.response);
      Toast(err.response.data.error, 2);
      // Toast(err.response.data.message, 2);
    }
  };
  const likePost = async (id) => {
    try {
      const response = await axios.put(
        "/likepost",
        {
          postId: id,
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
      //to update likedata immediately
      const newData = post.map((item) => {
        //this will update data array, if post matched,with fetched result
        if (item._id === response.data._id) {
          return response.data;
        } else {
          return item;
        }
      });

      setPost(newData);
    } catch (err) {
      console.log(err.response.data);
      console.log("this");
      //Toast(err.response.data.error, 2);
    }
  };
  const unlikePost = async (id) => {
    try {
      const response = await axios.put(
        "/unlikepost",
        {
          postId: id,
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
      const newData = post.map((item) => {
        //this will update data array, if post matched,with fetched result
        if (item._id === response.data._id) {
          return response.data;
        } else {
          return item;
        }
      });

      setPost(newData);
    } catch (err) {
      console.log(err.response.data);
      Toast(err.response.data.error, 2);
    }
  };

  const deletePost = async (postId) => {
    try {
      console.log(JSON.parse(localStorage.getItem("loggedUser")).accessToken);
      const response = await axios({
        url: `/deletepost/${postId}`,
        method: "delete",
        data: { postId },
        headers: {
          "Content-Type": "application/json",
          "x-access-token": JSON.parse(localStorage.getItem("loggedUser"))
            .accessToken,
        },
      });
      console.log(response);
      const newData = post.filter((item) => {
        return item._id !== response.data._id;
      });
      setPost(newData);
      Toast("Post Deleted", 1);
    } catch (err) {
      console.log(err.response);
      console.log(err.response.data);
      Toast(err.response.data.error, 2);
    }
  };

  useEffect(() => {
    fetchpost();
  }, []);

  const addComment = async (text, postId) => {
    try {
      const response = await axios.put(
        "/addComment",
        {
          postId,
          text,
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
      const newData = post.map((item) => {
        //this will update data array, if post matched,with fetched result
        if (item._id === response.data._id) {
          return response.data;
        } else {
          return item;
        }
      });

      setPost(newData);
    } catch (err) {
      console.log(err.response.data);
      console.log("this");
      //Toast(err.response.data.error, 2);
    }
  };
  const deleteComment = async (postId, commentId) => {
    console.log(postId, commentId);
    try {
      const response = await axios({
        url: `/deletecomment/${commentId}`,
        method: "delete",
        data: { postId },
        headers: {
          "Content-Type": "application/json",
          "x-access-token": JSON.parse(localStorage.getItem("loggedUser"))
            .accessToken,
        },
      });
      console.log(response);
      const newData = post.map((item) => {
        if (item._id === response.data._id) {
          return response.data;
        } else {
          return item;
        }
      });
      setPost(newData);
      Toast("Comment Deleted", 1);
    } catch (err) {
      console.log(err.response);
      Toast(err.response.data.message, 2);
      Toast(err.response.data.error, 2);
    }
  };
  return (
    <div className=" mx-10 flex flex-col px-auto md:px-24 lg:px-56 ">
      {post.map((item) => {
        return (
          <div
            className="rounded border-4 border-gray-900 my-2 justify-center shadow-2xl	"
            key={item._id}
          >
            <h1 className="bg-gradient-to-r from-green-400 to-blue-500  pl-2 py-1">
              <Link to={item.postedBy._id !== users.id?"/profile/"+item.postedBy._id:"/profile/"}>
              {item.postedBy._id === users.id ? "You" : item.postedBy.username}</Link>
              {item.postedBy._id === users.id && (
                <TrashIcon
                  className="h-5 w-5 mx-1 float-right text-white-500 hover:text-red-500"
                  onClick={() => deletePost(item._id)}
                />
              )}
            </h1>
            <div>
              <img className="w-full " src={item.photo} alt="profile" />
            </div>
            <div className="bg-gradient-to-br from-green-400 to-blue-500 px-2 py-2">
              <div className="flex ">
                <HeartIcon className="h-5 w-5 mx-1 text-white-500" />
                {item.likes.includes(users.id) ? (
                  <ThumbDownIcon
                    className="h-5 w-5 "
                    onClick={() => unlikePost(item._id)}
                  />
                ) : (
                  <ThumbUpIcon
                    className="h-5 w-5 "
                    onClick={() => likePost(item._id)}
                  />
                )}
              </div>
              <h5>{item.likes.length} likes</h5>
              <h5>{item.title}</h5>
              <p className="justify">
                {item.body.length > 30
                  ? item.body.substring(0, 20) + "...Read more"
                  : item.body.substring(0, 40)}
              </p>
              {item.comments.length ? (
                <div className=" mt-1 text-gray-600">
                  <h5>Comments</h5>
                  <div className="">
                    {item.comments.map((comment) => {
                      return (
                        <h6 key={comment._id}>
                          <span style={{ fontWeight: "500" }}>
                            {comment.postedBy._id === users.id
                              ? "You"
                              : comment.postedBy.username}
                          </span>
                          <span>
                            {" "}
                            {comment.text.length > 40
                              ? comment.text.substring(0, 20) + "...Read more"
                              : comment.text.substring(0, 40)}
                          </span>
                          {comment.postedBy._id === users.id ? (
                            <TrashIcon
                              className="h-5 w-5 mx-1 float-right text-white-500 hover:text-red-500"
                              onClick={() =>
                                deleteComment(item._id, comment._id)
                              }
                            />
                          ) : (
                            comment.postedBy.username
                          )}
                        </h6>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <></>
              )}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log(e.target[0].value);
                  addComment(e.target[0].value, item._id);
                  e.target[0].value = "";
                  console.log(e.target[0].value);
                }}
              >
                <input
                  className=" rounded outline-none w-full border-b-4 focus:border-red-500"
                  type="text"
                  placeholder="Add a comment ..."
                ></input>
              </form>
            </div>
          </div>
        );
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
        <div className="bg-gray-900 text-purple-500 px-2 py-2">
          <HeartIcon className="h-5 w-5 text-blue-500" />
          <h5>title</h5>
          <p>comment is comment</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(e.target);
            }}
          >
            <input
              className="outline-none w-full border-b-4"
              type="text"
              placeholder="Add a comment ..."
            ></input>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;

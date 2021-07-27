import React from "react";

const CreatePost = () => {
  return (
    <div className="flex bg-gray-100 py-8">
      <div className="w-full max-w-md m-auto rounded-lg bg-white border border-gray-200 shadow-lg py-10 px-10 md:px-20">
        <h2 className="text-2xl text-center pt-4 pb-5 text-primary	">
          Create Post
        </h2>
        <form>
          <div>
            <input
              type="text"
              id="title"
              placeholder="Title"
              className="outline-none w-full my-2 py-2 border-b-4"
            />
          </div>

          <div>
            <input
              type="text"
              id="body"
              placeholder="Description"
              className="outline-none w-full my-2 py-2 border-b-4"
            />
          </div>
          <div>
            <input
              type="file"
              id="pic"
              className="outline-none w-full my-2 py-2 border-b-4"
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
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;

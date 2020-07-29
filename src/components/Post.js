import React from "react";

const Post = ({ description, likes, url }) => {
  const imageUrl =
    process.env.NODE_ENV !== "development"
      ? url
      : process.env.REACT_APP_BACKEND_URL + url;

  return (
    <div className="post">
      <img className="post-img" src={imageUrl} alt={description} />
      <h4>{description}</h4>
      <div>
        <span>Likes: {likes}</span>
      </div>
    </div>
  );
};

export default Post;

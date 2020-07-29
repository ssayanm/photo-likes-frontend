import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Post from "../components/Post";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const url = process.env.REACT_APP_BACKEND_URL;

    const getPosts = async () => {
      const response = await fetch(`${url}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    getPosts();
  }, []);

  return (
    <div className="Home">
      {posts.map((post) => (
        <Link to={`/${post.id}`} key={post.id}>
          <Post
            likes={post.likes}
            description={post.description}
            url={post.image && post.image.url}
          />
        </Link>
      ))}
    </div>
  );
};

export default Home;

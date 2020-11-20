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
    <div>
      <div className="home section">
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
      <p>
        Please use the below details to login
        <br /> or you can signup and login
        <br /> username: admin@admin.com <br />
        password: Admin1
      </p>
    </div>
  );
};

export default Home;

import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

const Create = () => {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const url = process.env.REACT_APP_BACKEND_URL;
  console.log("file", file);

  const { user } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      setError("Please log in first");
      return;
    }

    if (!description) {
      setError("Please add a description");
      return;
    }

    if (!file) {
      setError("Please add a File");
      return;
    }

    const formData = new FormData();
    formData.append("data", JSON.stringify({ description }));
    formData.append("files.image", file);

    try {
      const response = await fetch(`${url}/posts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
        body: formData,
      });

      const data = await response.json();

      console.log("data", data);
    } catch (err) {
      console.log("Exception ", err);
      setError(err);
    }
  };

  return (
    <div className="create section">
      <h2>Create a Post</h2>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Please enter a description"
          value={description}
          onChange={(event) => {
            setError("");
            setDescription(event.target.value);
          }}
        />
        <input
          type="file"
          placeholder="Add a File"
          onChange={(event) => {
            setError("");
            setFile(event.target.files[0]);
          }}
        />
        <button className="btn">Submit</button>
      </form>
    </div>
  );
};

export default Create;

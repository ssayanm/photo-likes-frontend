import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

const Signup = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const url = process.env.REACT_APP_BACKEND_URL;

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${url}/auth/local/register`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          email,
          password,
        }),
      });
      const data = await response.json();
      if (data.message) {
        setError(data.message[0].messages[0].message);

        return;
      }
      console.log("data", data);

      setUser(data);
    } catch (err) {
      setError("Something went wrong ", err);
    }
  };

  return (
    <div className="signup section">
      <h2>Please Signup</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button className="btn">Signup</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
};

export default Signup;

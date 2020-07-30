import React, { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";

export const LikesContext = createContext(null);

export default ({ children }) => {
  const { user } = useContext(UserContext);
  const url = process.env.REACT_APP_BACKEND_URL;
  const [likesGiven, setLikesGiven] = useState([]);
  const [likesReceived, setLikesReceived] = useState([]);

  const reloader = () => {
    if (user) {
      const loadLikesGiven = async () => {
        try {
          const response = await fetch(
            `${url}/likes/given?user=${user.user.id}`,
            {
              headers: {
                Authorization: `Bearer ${user.jwt}`,
              },
            }
          );
          const data = await response.json();
          setLikesGiven(data);
        } catch (err) {
          console.log(err);
        }
      };
      loadLikesGiven();

      const loadLikesReceived = async () => {
        try {
          const response = await fetch(
            `${url}/likes/received?post.author=${user.user.id}`,
            {
              headers: {
                Authorization: `Bearer ${user.jwt}`,
              },
            }
          );
          const data = await response.json();
          setLikesReceived(data);
        } catch (err) {
          console.log(err);
        }
      };
      loadLikesReceived();
    }
  };

  useEffect(() => {
    reloader();
  }, [user]);

  console.log("likesGiven", likesGiven);
  console.log("likesReceived", likesReceived);

  return (
    <LikesContext.Provider value={{ likesGiven, likesReceived, reloader }}>
      {children}
    </LikesContext.Provider>
  );
};

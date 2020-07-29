import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Nav = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="Nav">
      <NavLink to="/" exact>
        Home
      </NavLink>
      {user && (
        <NavLink to="/create" exact>
          Create
        </NavLink>
      )}
      {!user && (
        <div>
          <NavLink to="/login" exact>
            Login
          </NavLink>
          <NavLink to="/signup" exact>
            Signup
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Nav;

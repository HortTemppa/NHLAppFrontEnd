import React from "react";
import { Link } from "react-router-dom";

const Menu = ({ open }) => {
  const classSelector = open ? "OpenMenu" : "ClosedMenu";

  return (
    <div className={classSelector}>
      <Link to="/teams">Teams</Link>
      <Link to="/standings">Standings</Link>
      <Link to="/players">Players</Link>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Menu;

import React, { useRef } from "react";
import { Link } from "react-router-dom";

import { useNHLService } from "../NHLContext";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

const Menu = ({ open, setOpen }) => {
  const NHLService = useNHLService();
  const loggedIn = NHLService.checkLogin();

  const node = useRef();

  const classSelector = open ? "OpenMenu" : "ClosedMenu";

  useOnClickOutside(node, () => setOpen(false));

  return loggedIn ? (
    <div className={classSelector} ref={node}>
      <Link to="/">Home</Link>
      <Link to="/teams">Teams</Link>
      <Link to="/players">Players</Link>
      <Link to="/standings">Standings</Link>
      <Link to="/favorites">Favorites</Link>
      <Link to="/logout">Logout</Link>
    </div>
  ) : (
    <div className={classSelector} ref={node}>
      <Link to="/">Home</Link>
      <Link to="/teams">Teams</Link>
      <Link to="/players">Players</Link>
      <Link to="/standings">Standings</Link>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Menu;

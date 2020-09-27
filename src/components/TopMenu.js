import React from "react";

import Home from "@material-ui/icons/Home";
import VpnKey from "@material-ui/icons/VpnKey";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Stars from "@material-ui/icons/Stars";

import { useHistory } from "react-router-dom";
import { useNHLService } from "./NHLContext";

const TopMenu = () => {
  const NHLService = useNHLService();

  const loggedIn = NHLService.checkLogin();

  const history = useHistory();

  const handleHomeClick = () => {
    history.push("/");
  };

  const handleLoginClick = () => {
    history.push("/login");
  };

  const handleFavoriteClick = () => {
    history.push("/favorites");
  };

  const handleLogoutClick = async () => {
    await NHLService.logout();

    history.push("/");
  };

  return loggedIn ? (
    <div className="MenuWrapper">
      <Home className="MenuItem" onClick={handleHomeClick} fontSize="large" />
      <Stars
        onClick={handleFavoriteClick}
        className="MenuItem"
        fontSize="large"
      />
      <ExitToApp
        className="MenuItem"
        onClick={handleLogoutClick}
        fontSize="large"
      />
    </div>
  ) : (
    <div className="MenuWrapper">
      <Home className="MenuItem" onClick={handleHomeClick} fontSize="large" />
      <VpnKey
        className="MenuItem"
        onClick={handleLoginClick}
        fontSize="large"
      />
    </div>
  );
};

export default TopMenu;

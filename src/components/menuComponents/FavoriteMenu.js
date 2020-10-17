import React from "react";
import { Link } from "react-router-dom";

import { useNHLService } from "../NHLContext";

import StarIcon from "@material-ui/icons/Star";

const FavoriteMenu = () => {
  const NHLService = useNHLService();
  const loggedIn = NHLService.checkLogin();

  return loggedIn ? (
    <Link to="/favorites" className="FavoritesLink">
      <StarIcon className="Star" fontSize="large" />
    </Link>
  ) : null;
};

export default FavoriteMenu;

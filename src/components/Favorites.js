import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useNHLService } from "./NHLContext";
import FavoritePlayers from "./statComponents/favorites/FavoritePlayers";
import FavoriteTeams from "./statComponents/favorites/FavoriteTeams";

const Favorites = () => {
  return (
    <>
      <FavoritePlayers />
      <FavoriteTeams />
    </>
  );
};

export default Favorites;

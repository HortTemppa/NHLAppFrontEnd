import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useNHLService } from "./NHLContext";
import FavoritePlayers from "./statComponents/favorites/FavoritePlayers";
import FavoriteTeams from "./statComponents/favorites/FavoriteTeams";

const Favorites = () => {
  const NHLService = useNHLService();

  const loggedIn = NHLService.checkLogin();
  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      return;
    }

    history.push("/");
  }, [history, loggedIn]);

  if (!loggedIn) {
    return null;
  }

  return (
    <>
<h2 style = {{textAlign:"center", marginBottom:"20px"}}>Favorites</h2>
      <FavoritePlayers />
      <FavoriteTeams />
    </>
  );
};

export default Favorites;

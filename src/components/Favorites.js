import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useNHLService } from "./NHLContext";

const Favorites = () => {
  const NHLService = useNHLService();
  const history = useHistory();

  const loggedIn = NHLService.checkLogin();

  useEffect(() => {
    if (!loggedIn) {
      history.push("/");
    } else {
      NHLService.getFavoritePlayers()
        .then((result) => {
          console.log(result.data);
        })
        .catch((error) => console.error());
    }
  });

  return <span>SO MANY FAVORITES</span>;
};

export default Favorites;

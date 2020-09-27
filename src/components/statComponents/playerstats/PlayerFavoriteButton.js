import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNHLService } from "../../NHLContext";

import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const PlayerFavoriteButton = ({ playerId }) => {
  const NHLService = useNHLService();

  const loggedIn = NHLService.checkLogin();

  const [playerFavorited, setPlayerFavorited] = useState();

  useEffect(() => {
    if (!loggedIn) {
      return;
    }

    NHLService.checkIfPlayerIsFavorited(parseInt(playerId)).then((result) =>
      setPlayerFavorited(result)
    );
  }, []);

  const handleFavoriteClick = () => {
    if (playerFavorited) {
      NHLService.removeFavoritePlayer(parseInt(playerId));
      setPlayerFavorited(false);
    } else {
      NHLService.addFavoritePlayer(parseInt(playerId));
      setPlayerFavorited(true);
    }
  };

  return loggedIn ? (
    playerFavorited ? (
      <button className="FavoriteButton" onClick={handleFavoriteClick}>
        <StarIcon fontSize="small" />
      </button>
    ) : (
      <button className="FavoriteButton" onClick={handleFavoriteClick}>
        <StarBorderIcon fontSize="small" />
      </button>
    )
  ) : null;
};

export default PlayerFavoriteButton;

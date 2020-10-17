import React, { useState, useEffect } from "react";
import { useNHLService } from "../../NHLContext";

import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const FavoriteTeam = ({ selectedTeam }) => {
  const NHLService = useNHLService();

  const loggedIn = NHLService.checkLogin();

  const [teamFavorited, setTeamFavorited] = useState();

  useEffect(() => {
    if (loggedIn) {
      NHLService.checkIfTeamIsFavorited(selectedTeam).then((result) =>
        setTeamFavorited(result)
      );
    }
  }, [selectedTeam, NHLService, loggedIn]);


  const handleFavoriteClick = () => {
    if (teamFavorited) {
      NHLService.removeFavoriteTeam(selectedTeam);
      setTeamFavorited(false);
    } else {
      NHLService.addFavoriteTeam(selectedTeam);
      setTeamFavorited(true);
    }
  };

  return loggedIn ? (
    teamFavorited ? (
      <button className="FavoriteButton" onClick={handleFavoriteClick}>
        <StarIcon fontSize="small" />
      </button>
    ) : (
      <button className="FavoriteButton" onClick={handleFavoriteClick}>
        <StarBorderIcon fontSize="small" />{" "}
      </button>
    )
  ) : null;
};

export default FavoriteTeam;

import React from "react";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();

  const handleStandingsClick = () => {
    history.push("/standings");
  };

  const handleTeamsClick = () => {
    history.push("/teams");
  };

  const handlePlayersClick = () => {
    history.push("/players");
  };

  return (
    <div className="HomeMenuWrapper">
      <div className="GreyBox" onClick={handleStandingsClick}>
        <span> Standings</span>
      </div>

      <div className="DarkBox" onClick={handleTeamsClick}>
        <span>Teams</span>
      </div>
      <div className="GreyBox" onClick={handlePlayersClick}>
        <span>Players</span>
      </div>
    </div>
  );
};

export default Home;

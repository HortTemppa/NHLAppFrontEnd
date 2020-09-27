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
    <div>
      <div className="HomeButtonWrapper">
        <button onClick={handleStandingsClick}>Standings</button>
      </div>
      <div className="HomeButtonWrapper">
        <button onClick={handleTeamsClick}>Teams</button>
      </div>
      <div className="HomeButtonWrapper">
        <button onClick={handlePlayersClick}>Players</button>
      </div>
    </div>
  );
};

export default Home;

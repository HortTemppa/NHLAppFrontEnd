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
    <>
      <div className="GreyBox" onClick={handleStandingsClick}>
        Standings
      </div>

      <div className="DarkBox" onClick={handleTeamsClick}>
        Teams
      </div>
      <div className="GreyBox" onClick={handlePlayersClick}>
        Players
      </div>
    </>
  );
};

export default Home;

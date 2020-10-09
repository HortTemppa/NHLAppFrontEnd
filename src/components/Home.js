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
    <div className="HomeWrapper">
      <span>Welcome to HockeyStats!</span>
      <span>
        HockeyStats is a web app dedicated to NHL statistics. This app provides
        you with in-depth data about hockey players, teams and leagues! By
        logging in with a Google account you can save your favorite players and
        teams and make comparisons between them.
      </span>
    </div>
  );
};

export default Home;

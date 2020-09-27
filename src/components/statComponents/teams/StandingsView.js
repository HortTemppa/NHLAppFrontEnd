import React from "react";

import { useSpring, animated } from "react-spring";

import TeamStats from "./TeamStats";
import FavoriteTeam from "./FavoriteTeam";
import ButtonFullTeamPage from "./ButtonFullTeamPage";

const StandingsView = ({ selectedTeam, rawData, chartType }) => {
  const props = useSpring({
    position: "relative",
    top: "0px",
    opacity: "1",
    from: { top: "-25px", opacity: "0" },
  });

  return (
    <animated.div style={props} className="TeamView">
      <FavoriteTeam />

      <TeamStats
        chartType={chartType}
        selectedTeam={selectedTeam}
        rawData={rawData}
      />
      <ButtonFullTeamPage selectedTeam={selectedTeam} />
    </animated.div>
  );
};

export default StandingsView;

import React, { useRef, useState, useEffect } from "react";
import { createLeaderboardsChart } from "../../../utilities/players/createLeaderboardsChart";
import { useWindowSize } from "../../../hooks/useWindowSize";

import PlayerView from "./PlayerView";

const PointLeaders = ({ data, sortBy }) => {
  const svgRef = useRef();
  const [selectedPlayer, setSelectedPlayer] = useState(49);

  const windowSize = useWindowSize();

  useEffect(() => {
    if (!data) {
      return;
    }
    createLeaderboardsChart(data, sortBy, svgRef, setSelectedPlayer);
  }, [data, windowSize, sortBy, svgRef, selectedPlayer]);

  console.log("selected player:", selectedPlayer);

  if (!data) {
    return null;
  }

  return (
    <>
      <svg ref={svgRef}>
        <g className="x-axis"></g>
        <g className="y-axis"></g>
      </svg>
      <PlayerView data={data[selectedPlayer]} />
    </>
  );
};

export default PointLeaders;

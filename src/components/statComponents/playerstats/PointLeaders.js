import React, { useRef, useState, useEffect } from "react";
import { createLeaderboardsChart } from "../../../utilities/players/createLeaderboardsChart";
import { useWindowSize } from "../../../hooks/useWindowSize";

import StatChart from "./StatChart";
import PlayerView from "./PlayerView";

const PointLeaders = ({ data, sortBy, setDataLength, dataLength }) => {
  const svgRef = useRef();
  const [selectedPlayer, setSelectedPlayer] = useState(9);
  const [svgHeight, setSvgHeight] = useState(250);

  const [playerStatState, setPlayerStatState] = useState();

  const windowSize = useWindowSize();

  const handleStatClick = (state) => {
    return setPlayerStatState(state);
  };

  const handleButtonClick = () => {
    if (dataLength === 50) {
      setDataLength(10);
      setSvgHeight(250);
      setSelectedPlayer(9);
    } else {
      setDataLength(dataLength + 10);
      setSvgHeight(svgHeight + 100);
    }
  };

  useEffect(() => {
    if (!data || !sortBy || !selectedPlayer || !dataLength) {
      return;
    }
    createLeaderboardsChart(data, sortBy, svgRef, setSelectedPlayer, svgHeight);
  }, [
    data,
    windowSize,
    sortBy,
    svgRef,
    svgHeight,
    selectedPlayer,
    dataLength,
    playerStatState,
  ]);

  if (!data) {
    return null;
  }

  return (
    <>
      <StatChart
        handleButtonClick={handleButtonClick}
        svgRef={svgRef}
        dataLength={dataLength}
      />
      <PlayerView
        data={data[selectedPlayer]}
        handleStatClick={handleStatClick}
        state={playerStatState}
      />
    </>
  );
};

export default PointLeaders;

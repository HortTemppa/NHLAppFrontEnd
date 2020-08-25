import React, { useEffect, useRef, useState } from "react";
import { createStandingsChart } from "../../../utilities/standings/createStandingsChart";
import StandingsView from "../teams/StandingsView";

const Pacific = ({ rawData, chartTypeId }) => {
  const svgRef = useRef();
  const [selectedTeam, setSelectedTeam] = useState();

  const chartType = chartTypeId - 1;

  useEffect(() => {
    if (rawData) {
      createStandingsChart(rawData, svgRef, setSelectedTeam, chartType);
    }
  }, [rawData, chartType]);

  return (
    <div className="StandingsWrapper">
      <h1>Pacific</h1>
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <StandingsView
        selectedTeam={selectedTeam}
        rawData={rawData}
        chartType={chartType}
      />
    </div>
  );
};

export default Pacific;

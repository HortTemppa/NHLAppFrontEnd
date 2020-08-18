import React, { useEffect, useRef, useState } from "react";
import { createStandingsChart } from "../../../utilities/createStandingsChart";
import StandingsView from "../teams/StandingsView";

const Metro = ({ rawData, chartTypeId }) => {
  const svgRef = useRef();
  const [selectedTeam, setSelectedTeam] = useState();

  const chartType = chartTypeId - 1;

  useEffect(() => {
    if (rawData) {
      createStandingsChart(rawData, svgRef, setSelectedTeam, chartType);
    }
  }, [rawData]);

  console.log("selected:", selectedTeam);
  return (
    <div className="StandingsWrapper">
      <h1>Metro</h1>
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

export default Metro;

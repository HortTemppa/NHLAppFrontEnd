import React, { useEffect, useRef, useState } from "react";
import { createStandingsChart } from "../../../utilities/createStandingsChart";

const Eastern = ({ rawData, chartTypeId }) => {
  const svgRef = useRef();
  const [selectedTeam, setSelectedTeam] = useState();

  const chartType = chartTypeId - 1;

  useEffect(() => {
    if (rawData) {
      createStandingsChart(rawData, svgRef, setSelectedTeam, chartType);
    }
  }, [rawData]);

  return (
    <>
      <h1>Eastern Conference</h1>
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </>
  );
};

export default Eastern;
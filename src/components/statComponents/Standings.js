import React, { useRef, useEffect, useState } from "react";
import { useNHLService } from "../NHLContext";
import { select, axisBottom, axisLeft, scaleLinear, scaleBand } from "d3";

import { useWindowSize } from "../../hooks/useWindowSize";

const Standings = () => {
  const svgRef = useRef();

  const windowSize = useWindowSize();

  const nhlService = useNHLService();

  const [data, setData] = useState();

  useEffect(() => {
    const svg = select(svgRef.current);

    const xScale = scaleBand()
      .domain([1, 2, 3, 4, 5, 6, 7, 8])
      .range([0, parseInt(svg.style("width"))]);
    const yScale = scaleLinear().domain([0, 150]).range([150, 0]);
    const xAxis = axisBottom(xScale).ticks(9);
    const yAxis = axisLeft(yScale).ticks(7);

    svg.select(".x-axis").style("transform", "translateY(150px").call(xAxis);
    svg.select(".y-axis").call(yAxis);

    nhlService.getStandings().then((result) => {
      setData(result.data);
    });
  }, [windowSize]);

  return (
    <>
      <p>Standings</p>
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </>
  );
};

export default Standings;

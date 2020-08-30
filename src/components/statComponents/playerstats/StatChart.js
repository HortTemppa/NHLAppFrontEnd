import React from "react";

const StatChart = ({ handleButtonClick, svgRef, dataLength }) => {
  return (
    <>
      <svg ref={svgRef}>
        <g className="x-axis"></g>
        <g className="y-axis"></g>
      </svg>
      <div className="ButtonWrapper">
        <button onClick={handleButtonClick}>
          {dataLength === 50 ? "Show less" : "Show more"}
        </button>
      </div>
    </>
  );
};

export default StatChart;

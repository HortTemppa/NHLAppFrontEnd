import React, { useEffect, useRef, useState } from "react";
import { select, axisBottom, axisLeft, scaleLinear, scaleBand, svg } from "d3";
import { getRandomColor } from "../../../utilities/getRandomColor";

const Metro = ({ rawData }) => {
  const svgRef = useRef();
  const [selectedTeam, setSelectedTeam] = useState();

  useEffect(() => {
    if (rawData) {
      rawData[0].sort((a, b) => a.points - b.points);

      console.log(rawData);

      const randomColor = () => getRandomColor();

      const data = rawData[0].map((teamRecords) => {
        return teamRecords.points;
      });

      const tickLabels = rawData[0].map((teamRecords) => {
        return teamRecords.team.name;
      });

      data.sort((a, b) => a - b);
      console.log(data);
      const svg = select(svgRef.current);

      const chartLength = data.map((value, i) => {
        return i + 1;
      });

      function handleMouseOver(value, index) {
        const barAdjustment = () => {
          console.log(parseInt(svg.style("width")) / chartLength);
        };

        svg
          .selectAll(".tooltip")
          .data([value])
          .join("text")
          .attr("class", "tooltip")
          .text(`${value}pts`)
          .attr("x", xScale(value) + 5) //xScale(index + 1) + yScale.bandwidth() / 2)
          .attr("y", yScale(index + 1) + yScale.bandwidth());
      }

      function handleMouseClick(index) {
        console.log("index:", index);
        setSelectedTeam(rawData[0][index].team.id);
      }

      const yScale = scaleBand()
        .domain(chartLength)
        .range([150, 0])
        .padding(0.4);
      const xScale = scaleLinear()
        .domain([data[0] - 10, [data[data.length - 1] + 10]])
        .range([0, parseInt(svg.style("width"))]);
      const xAxis = axisBottom(xScale);

      const yAxis = axisLeft(yScale)
        .ticks(chartLength.length)
        .tickFormat((d, i) => tickLabels[i]);

      svg.select(".x-axis").style("transform", "translateY(150px").call(xAxis);
      svg.select(".y-axis").call(yAxis);

      svg
        .selectAll(".bar")
        .data(data)
        .join("rect")
        .attr(
          "title",
          (value, index) => `${tickLabels[index]}: ${value} points`
        )
        .attr("id", (value, index) => index)
        .attr("class", "bar")
        .attr("y", (value, index) => yScale(index + 1))
        .attr("x", svg.style("width") - xScale)
        .attr("width", (value, index) => xScale(value))
        .attr("height", yScale.bandwidth())
        .style("fill", randomColor)
        .on("mouseover", (value, index) => handleMouseOver(value, index))
        .on("mouseleave", () => svg.select(".tooltip").remove())
        .on("mousedown", (value, index) => handleMouseClick(index));
    }
  }, [rawData]);

  return (
    <svg ref={svgRef}>
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  );
};

export default Metro;

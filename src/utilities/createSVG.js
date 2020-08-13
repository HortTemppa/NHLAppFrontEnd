import { select, axisBottom, axisLeft, scaleLinear, scaleBand } from "d3";

import { handleMouseClick, handleMouseOver } from "./mouseEvents";
import { getRandomColor } from "./getRandomColor";

export function createSVG(height, data, tickLabels, setSelectedTeam, svgRef) {
  const chartLength = data.map((value, i) => {
    return i + 1;
  });

  const svg = select(svgRef.current);

  const yScale = scaleBand()
    .domain(chartLength)
    .range([height, 0])
    .padding(0.4);
  const xScale = scaleLinear()
    .domain([data[0] - 10, [data[data.length - 1] + 10]])
    .range([0, parseInt(svg.style("width"))]);
  const xAxis = axisBottom(xScale);

  const yAxis = axisLeft(yScale)
    .ticks(chartLength.length)
    .tickFormat((d, i) => tickLabels[i]);

  svg
    .select(".x-axis")
    .style("transform", `translateY(${height}px`)
    .call(xAxis);
  svg.select(".y-axis").call(yAxis);

  svg
    .selectAll(".bar")
    .data(data)
    .join("rect")
    .attr("title", (value, index) => `${tickLabels[index]}: ${value} points`)
    .attr("id", (value, index) => index)
    .attr("class", "bar")
    .attr("y", (value, index) => yScale(index + 1))
    .attr("x", svg.style("width") - xScale)
    .attr("width", (value, index) => xScale(value))
    .attr("height", yScale.bandwidth())
    .style("fill", getRandomColor)
    .on("mouseover", (value, index) =>
      handleMouseOver(value, index, xScale, yScale, svg)
    )
    .on("mouseleave", () => svg.select(".tooltip").remove())
    .on("mousedown", (value, index) =>
      handleMouseClick(index, setSelectedTeam, data)
    );
}

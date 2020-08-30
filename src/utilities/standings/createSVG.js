import { select, axisBottom, axisLeft, scaleLinear, scaleBand } from "d3";

import { handleMouseOver } from "../general/mouseEvents";
import { getRandomColor } from "../general/getRandomColor";

export function createSVG(
  height,
  data,
  tickLabels,
  setSelectedTeam,
  svgRef,
  handleMouseClick
) {
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

  svg.style("height", `${height}px`);

  svg
    .select(".x-axis")
    .style("transform", `translateY(${height}px`)
    .call(xAxis);
  svg
    .select(".y-axis")
    .style("font", "inherit")
    .style("font-size", "12px")
    .call(yAxis);

  svg
    .selectAll(".bar")
    .data(data)
    .join("rect")
    .attr("title", (value, index) => `${tickLabels[index]}: ${value} points`)
    .attr("id", (value, index) => index)
    .attr("class", "bar")
    .attr("y", (value, index) => yScale(index + 1))
    .attr("x", (value, index) => svg.style("width") - xScale(index))
    .on("mouseover", (value, index) => {
      handleMouseOver(value, index, xScale, yScale, svg);
      svg.select(`rect[id="${index}"]`).style("stroke", "black");
    })
    .on("mouseleave", (value, index) => {
      svg.select(".tooltip").remove();
      svg.select(`rect[id="${index}"]`).style("stroke", "none");
    })
    .on("mousedown", (value, index) => handleMouseClick(index))
    .transition()
    .attr("width", (value, index) => xScale(value))
    .attr("height", yScale.bandwidth())
    .style("fill", (value, index) => getRandomColor(index));
}

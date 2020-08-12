import { getRandomColor } from "./getRandomColor";
import { select, axisBottom, axisLeft, scaleLinear, scaleBand, svg } from "d3";

export function createStandingsChart(
  rawData,
  svgRef,
  setSelectedTeam,
  chartType
) {
  const randomColor = () => getRandomColor();

  const svg = select(svgRef.current);

  let data = [];
  let tickLabels = [];
  let height = 150;

  if (chartType === 4) {
    height = 250;

    svg.attr("class", "Conference");

    data = rawData[chartType - 4].concat(rawData[chartType - 3]);

    tickLabels = data.map((teamRecords) => {
      return teamRecords.team.name;
    });

    data = data.map((teamRecords) => {
      return teamRecords.points;
    });
  } else {
    rawData[chartType].sort((a, b) => a.points - b.points);
    data = rawData[chartType].map((teamRecords) => {
      return teamRecords.points;
    });

    tickLabels = rawData[chartType].map((teamRecords) => {
      return teamRecords.team.name;
    });
  }

  data.sort((a, b) => a - b);
  console.log(data);

  const chartLength = data.map((value, i) => {
    return i + 1;
  });

  function handleMouseOver(value, index) {
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
    //Tämä täytyy miettiä uusiksi.
    console.log("index:", index);
    setSelectedTeam(data[index].team.id);
  }

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
    .style("fill", randomColor)
    .on("mouseover", (value, index) => handleMouseOver(value, index))
    .on("mouseleave", () => svg.select(".tooltip").remove())
    .on("mousedown", (value, index) => handleMouseClick(index));
}

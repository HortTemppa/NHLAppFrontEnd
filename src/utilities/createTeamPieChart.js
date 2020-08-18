import { select, pie, entries, arc, scaleOrdinal, remove } from "d3";

export function createTeamPieChart(svgRef, data) {
  const width = 160;
  const height = 160;
  const margin = 0;

  const svg = select(svgRef.current);

  const radius = Math.min(width, height) / 2 - margin;

  svg
    .attr("width", width)
    .attr("height", height)
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  const pieChartData = {
    wins: data[0].leagueRecord.wins,
    losses: data[0].leagueRecord.losses,
    ot: data[0].leagueRecord.ot,
  };

  const color = scaleOrdinal()
    .domain(pieChartData)
    .range(["#42b3a4", "#d45d1e", "#e0e02d", "#6b486b", "#a05d56"]);

  const chart = pie().value((d) => {
    return d.value;
  });

  const data_ready = chart(entries(pieChartData));

  function midAngle(d) {
    return d.startAngle + (d.endAngle - d.startAngle) / 2;
  }

  svg.selectAll("path").remove();
  svg.selectAll("text").remove();

  svg
    .attr("width", width)
    .attr("height", height)
    .selectAll("slices")
    .data(data_ready)
    .enter()
    .append("path")
    .attr(
      "d",
      arc()
        .innerRadius(radius * 0.5)
        .outerRadius(radius)
    )
    .attr("fill", (d) => color(d.data.key))
    .attr("stroke", "grey")
    .style("stroke-width", "1px")
    .style("opacity", 1.0);

  svg
    .selectAll("slices")
    .data(data_ready)
    .enter()
    .append("text")
    .text((d) => {
      return d.data.key === "ot" ? `OT losses` : d.data.key;
    })
    .attr("transform", (d) => {
      let pos = arc()
        .innerRadius(radius * 0.5)
        .outerRadius(radius)
        .centroid(d);
      pos[0] = radius * (midAngle(d) < Math.PI ? 1.5 : -1.5);
      pos[1] = pos[1] * 1.2;

      return "translate(" + pos + ")";
    })
    .style("text-anchor", "middle")
    .style("font-size", 17);

  svg
    .selectAll("slices")
    .data(data_ready)
    .enter()
    .append("text")
    .text((d) => {
      return d.data.value;
    })
    .attr("transform", (d) => {
      let pos = arc()
        .innerRadius(radius * 0.5)
        .outerRadius(radius)
        .centroid(d);

      return "translate(" + pos + ")";
    })
    .style("text-anchor", "middle")
    .style("font-size", 12);
}

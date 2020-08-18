export function handleMouseOver(value, index, xScale, yScale, svg) {
  svg
    .selectAll(".tooltip")
    .data([value])
    .join("text")
    .attr("class", "tooltip")
    .text(`${value}pts`)
    .attr("x", xScale(value) + 5) //xScale(index + 1) + yScale.bandwidth() / 2)
    .attr("y", yScale(index + 1) + yScale.bandwidth());
}

export function handleMouseClick(index, rawData, chartType, setSelectedTeam) {
  switch (chartType) {
    case 0:
    case 1:
    case 2:
    case 3:
      setSelectedTeam(rawData[chartType][index].team.id);
      break;
    case 4:
      let easternArray = rawData[0].concat(rawData[1]);
      easternArray.sort((a, b) => a.points - b.points);
      setSelectedTeam(easternArray[index].team.id);
      break;
    case 5:
      let westernArray = rawData[2].concat(rawData[3]);
      westernArray.sort((a, b) => a.points - b.points);
      setSelectedTeam(westernArray[index].team.id);
      break;
    case 6:
      const leagueArray = rawData[0].concat(
        rawData[1].concat(rawData[2].concat(rawData[3]))
      );
      leagueArray.sort((a, b) => a.points - b.points);
      setSelectedTeam(leagueArray[index].team.id);
      break;
  }
  console.log("index:", index);
  //setSelectedTeam(data[index].team.id);
}

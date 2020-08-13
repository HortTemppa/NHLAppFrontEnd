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

export function handleMouseClick(index, setSelectedTeam, data) {
  //Tämä täytyy miettiä uusiksi.
  console.log("index:", index);
  setSelectedTeam(data[index].team.id);
}

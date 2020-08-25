import { setChartType } from "./setChartData";
import { select } from "d3";

export function setChartClass(svgRef) {
  const svg = select(svgRef.current);

  if (chartType === 4 || chartType === 5) {
    svg.attr("class", "Conference");
  } else if (chartType === 6) {
    svg.attr("class", "League");
  } else {
    svg.attr("class", "Division");
  }
}

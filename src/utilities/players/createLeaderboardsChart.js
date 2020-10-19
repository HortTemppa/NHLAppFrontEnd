import { setChartData } from "./setChartData";
import { setTickLabels } from "./setTickLabels";
import { createSVG } from "./createSVG";

export async function createLeaderboardsChart(
  rawData,
  sortBy,
  svgRef,
  setSelectedPlayer,
  height
) {
  console.log(rawData);
  let data = await setChartData(rawData, sortBy);
  let tickLabels = await setTickLabels(rawData);


  createSVG(height, data, tickLabels, svgRef, setSelectedPlayer);
}

import { setChartData } from "./setChartData";
import { setTickLabels } from "./setTickLabels";
import { createSVG } from "./createSVG";

export async function createLeaderboardsChart(
  rawData,
  sortBy,
  svgRef,
  setSelectedPlayer
) {
  console.log(rawData);
  let data = await setChartData(rawData, sortBy);
  let tickLabels = await setTickLabels(rawData);
  const height = 700;

  console.log("data", data);
  console.log("tick labels:", tickLabels);

  createSVG(height, data, tickLabels, svgRef, setSelectedPlayer);
}

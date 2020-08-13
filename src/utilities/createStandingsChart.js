import { setChartData } from "./setChartData";
import { setChartHeight } from "./setChartHeight";
import { setTickLabels } from "./setTickLabels";
import { createSVG } from "./createSVG";
import { sortDataAscending } from "./dataSorts";

export async function createStandingsChart(
  rawData,
  svgRef,
  setSelectedTeam,
  chartType
) {
  const data = await setChartData(rawData, chartType);
  const tickLabels = await setTickLabels(rawData, chartType);
  const height = await setChartHeight(chartType);

  sortDataAscending(data);

  createSVG(height, data, tickLabels, setSelectedTeam, svgRef);
}

import { setChartData } from "./setChartData";
import { setChartHeight } from "./setChartHeight";
import { setTickLabels } from "./setTickLabels";
import { createSVG } from "./createSVG";
import { sortDataAscending } from "./dataSorts";
import { handleMouseClick } from "../general/mouseEvents";

export async function createStandingsChart(
  rawData,
  svgRef,
  setSelectedTeam,
  chartType
) {
  const data = await setChartData(rawData, chartType, setSelectedTeam);
  const tickLabels = await setTickLabels(rawData, chartType);
  const height = await setChartHeight(chartType);

  await sortDataAscending(data);

  const mouseClickHandler = (index) =>
    handleMouseClick(index, rawData, chartType, setSelectedTeam);

  createSVG(
    height,
    data,
    tickLabels,
    setSelectedTeam,
    svgRef,
    mouseClickHandler
  );
}

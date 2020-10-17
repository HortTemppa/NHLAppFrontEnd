export function setChartData(rawData, sortBy) {
  let data = [];

  switch (sortBy) {
    case "points":
      data = [];

      data.push(
        rawData.map((player) => {
          return player.points;
        })
      );
      break;

    case "assists":
      data = [];

      data.push(
        rawData.map((player) => {
          return player.assists;
        })
      );
      break;

    case "goals":
      data = [];

      data.push(
        rawData.map((player) => {
          return player.goals;
        })
      );
      break;

    default:
  }

  return data[0];
}

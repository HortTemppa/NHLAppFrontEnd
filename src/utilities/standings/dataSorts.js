export function sortDataAscending(data) {
  data.sort((a, b) => a - b);
}

export function sortRawDataAscending(data, chartType) {
  switch (chartType) {
    case 0:
    case 1:
    case 2:
    case 3:
      data[chartType].sort((a, b) => a.points - b.points);
      return data[chartType];
    case 4:
      const easternArray = data[0].concat(data[1]);
      easternArray.sort((a, b) => a.points - b.points);
      return easternArray;
    case 5:
      const westernArray = data[2].concat(data[3]);
      westernArray.sort((a, b) => a.points - b.points);
      return westernArray;

    case 6:
      const leagueArray = data[0]
        .concat(data[1])
        .concat(data[2])
        .concat(data[3]);
      leagueArray.sort((a, b) => a.points - b.points);

      return leagueArray;

    default:
      break;
  }
}

export async function setTickLabels(rawData, chartType) {
  let tickLabels = [];

  switch (chartType) {
    case 0:
    case 1:
    case 2:
    case 3:
      rawData[chartType].sort((a, b) => a.points - b.points);
      tickLabels = rawData[chartType].map((teamRecords) => {
        return teamRecords.team.name;
      });
      break;

    case 4:
      const easternArray = rawData[0].concat(rawData[1]);
      easternArray.sort((a, b) => a.points - b.points);
      tickLabels = easternArray.map((teamRecords) => {
        return teamRecords.team.name;
      });
      break;

    case 5:
      const westernArray = rawData[2].concat(rawData[3]);
      westernArray.sort((a, b) => a.points - b.points);

      tickLabels = westernArray.map((teamRecords) => {
        return teamRecords.team.name;
      });
      break;

    case 6:
      const leagueArray = rawData[0].concat(
        rawData[1].concat(rawData[2].concat(rawData[3]))
      );
      leagueArray.sort((a, b) => a.points - b.points);

      tickLabels = leagueArray.map((teamRecords) => {
        return teamRecords.team.name;
      });
  }

  return tickLabels;
}

export async function setTickLabels(rawData, chartType) {
  let tickLabels = [];

  switch (chartType) {
    case 0:
    case 1:
    case 2:
    case 3:
      tickLabels = rawData[chartType].map((teamRecords) => {
        return teamRecords.team.name;
      });
      break;

    case 4:
      const easternArray = rawData[0].concat(rawData[1]);
      tickLabels = easternArray.map((teamRecords) => {
        return teamRecords.team.name;
      });
      break;

    case 5:
      const westernArray = rawData[2].concat(rawData[3]);
      tickLabels = westernArray.map((teamRecords) => {
        return teamRecords.team.name;
      });
  }

  return tickLabels;
}

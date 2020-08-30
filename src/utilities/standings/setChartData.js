export async function setChartData(rawData, chartType, setSelectedTeam) {
  let data = [];

  if (chartType === 4) {
    data = rawData[chartType - 4].concat(rawData[chartType - 3]);
    data.sort((a, b) => a.points - b.points);
    setSelectedTeam(data[data.length - 1].team.id);
    data = data.map((teamRecords) => {
      return teamRecords.points;
    });
  } else if (chartType === 5) {
    data = rawData[chartType - 3].concat(rawData[chartType - 2]);
    data.sort((a, b) => a.points - b.points);
    setSelectedTeam(data[data.length - 1].team.id);
    data = data.map((teamRecords) => {
      return teamRecords.points;
    });
  } else if (chartType === 6) {
    data = rawData[0].concat(rawData[1]).concat(rawData[2]).concat(rawData[3]);
    data.sort((a, b) => a.points - b.points);
    setSelectedTeam(data[data.length - 1].team.id);

    data = data.map((teamRecords) => {
      return teamRecords.points;
    });
  } else {
    rawData[chartType].sort((a, b) => a.points - b.points);
    setSelectedTeam(rawData[chartType][rawData[chartType].length - 1].team.id);
    data = rawData[chartType].map((teamRecords) => {
      return teamRecords.points;
    });
  }
  return data;
}

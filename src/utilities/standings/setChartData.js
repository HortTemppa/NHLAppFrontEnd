export async function setChartData(rawData, chartType) {
  let data = [];

  if (chartType === 4) {
    data = rawData[chartType - 4].concat(rawData[chartType - 3]);
    data.sort((a, b) => a.points - b.points);
    data = data.map((teamRecords) => {
      return teamRecords.points;
    });
  } else if (chartType === 5) {
    data = rawData[chartType - 3].concat(rawData[chartType - 2]);
    data.sort((a, b) => a.points - b.points);
    data = data.map((teamRecords) => {
      return teamRecords.points;
    });
  } else if (chartType === 6) {
    data = rawData[0].concat(rawData[1]).concat(rawData[2]).concat(rawData[3]);
    data.sort((a, b) => a.points - b.points);

    data = data.map((teamRecords) => {
      return teamRecords.points;
    });
  } else {
    rawData[chartType].sort((a, b) => a.points - b.points);
    data = rawData[chartType].map((teamRecords) => {
      return teamRecords.points;
    });
  }
  return data;
}

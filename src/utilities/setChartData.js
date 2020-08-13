export async function setChartData(rawData, chartType) {
  let data = [];

  if (chartType === 4) {
    data = rawData[chartType - 4].concat(rawData[chartType - 3]);

    data = data.map((teamRecords) => {
      return teamRecords.points;
    });
  } else if (chartType === 5) {
    data = rawData[chartType - 3].concat(rawData[chartType - 2]);

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

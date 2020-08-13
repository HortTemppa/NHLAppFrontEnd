export async function setChartHeight(chartType) {
  console.log(chartType);
  if (chartType === 4 || chartType === 5) {
    const height = await 250;

    return await height;
  } else if (chartType === 6) {
    const height = await 500;

    return height;
  } else {
    const height = await 150;
    return height;
  }
}
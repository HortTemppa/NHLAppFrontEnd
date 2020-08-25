export function setTickLabels(rawData) {
  let tickLabels = rawData.map((player, index) => {
    return ` ${player.skaterFullName}`;
  });

  return tickLabels;
}

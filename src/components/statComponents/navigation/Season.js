import React from "react";

const Season = ({ setSeason }) => {
  const handleSeasonChange = (event) => {
    setSeason(event.target.value);
  };
  return (
    <select onChange={handleSeasonChange}>
      <option value="20192020">2019/2020</option>
      <option value="20182019">2018/2019</option>
      <option value="20172018">2017/2018</option>
    </select>
  );
};

export default Season;

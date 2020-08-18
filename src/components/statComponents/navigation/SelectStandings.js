import React from "react";

const SelectStandings = ({ chartChange }) => {
  return (
    <select onChange={chartChange}>
      <option value="1">Metro</option>
      <option value="2">Atlantic</option>
      <option value="3">Central</option>
      <option value="4">Pacific</option>
      <option value="5">Eastern Conference</option>
      <option value="6">Western Conference</option>
      <option value="7">League</option>
    </select>
  );
};

export default SelectStandings;

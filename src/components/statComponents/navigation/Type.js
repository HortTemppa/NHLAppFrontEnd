import React from "react";

const Type = ({ setType }) => {
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  return (
    <select className="Select" onChange={handleTypeChange}>
      <option value="2">Regular Season</option>
      <option value="3">Playoffs</option>
    </select>
  );
};

export default Type;

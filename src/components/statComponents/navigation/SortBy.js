import React from "react";

const SortBy = ({ setSortBy }) => {
  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <select className="Select" onChange={handleSortByChange}>
      <option value="points">Points</option>
      <option value="goals">Goals</option>
      <option value="assists">Assists</option>
    </select>
  );
};

export default SortBy;

import React from "react";

const PlayerHeader = ({ data }) => {
  return (
    <div className="PlayerNameTeam">
      <h2>{data.name}</h2>
      <h3>{data.team}</h3>
    </div>
  );
};

export default PlayerHeader;

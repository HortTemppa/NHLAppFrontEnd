import React from "react";
import { useHistory } from "react-router-dom";

const ButtonFullTeamPage = ({ selectedTeam }) => {
  const history = useHistory();

  const handleTeamPageClick = () => {
    history.push(`/teams/${selectedTeam}`);
  };

  return (
    <div className="ButtonWrapper">
      <button onClick={handleTeamPageClick}>Full Team Page</button>
    </div>
  );
};

export default ButtonFullTeamPage;

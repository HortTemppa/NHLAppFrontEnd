import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { useNHLService } from "../../NHLContext";

const TeamView = () => {
  const [teamData, setTeamData] = useState();

  const history = useHistory();

  const NHLService = useNHLService();

  useEffect(() => {
    NHLService.getTeams().then((result) => {
      setTeamData(result.data);
    });
  }, [NHLService]);

  console.log(teamData);
  if (!teamData) {
    return null;
  }

  return (
    <>
      <div className="TeamWrapper">
        {teamData.map((result, i) => {
          return (
            <div
              key={result.id}
              onClick={() => history.push(`/teams/${result.id}`)}
              className="SingleTeam"
            >
              <span>{result.name}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TeamView;
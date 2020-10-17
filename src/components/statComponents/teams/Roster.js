import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Loading from "../../Loading";
import { useNHLService } from "../../NHLContext";

const Roster = ({ teamId }) => {
  const NHLService = useNHLService();

  const history = useHistory();

  const [roster, setRoster] = useState();

  useEffect(() => {
    NHLService.getTeamRoster(teamId)
      .then((result) => {
        console.log(result);
        setRoster(result.data);
      })
      .catch((error) => console.log(error));
  }, [teamId, NHLService]);

  console.log(roster);

  return roster ? (
    <>
      <h2 style={{ textAlign: "center", marginTop: "15px" }}>Roster</h2>
      <h3>Forwards</h3>
      <div className="RosterWrapper">
        {roster.map((player, i) => {
          return player.type === "Forward" ? (
            <div
              key={player.id}
              onClick={() => history.push(`/players/${player.id}`)}
              className="SingleTeam"
            >
              <span>{player.name}</span>
            </div>
          ) : null;
        })}
      </div>
      <h3>Defenders</h3>
      <div className="RosterWrapper">
        {roster.map((player, i) => {
          return player.type === "Defenseman" ? (
            <div
              key={player.id}
              onClick={() => history.push(`/players/${player.id}`)}
              className="SingleTeam"
            >
              <span>{player.name}</span>
            </div>
          ) : null;
        })}
      </div>
      <h3>Goalies</h3>
      <div className="RosterWrapper">
        {roster.map((player, i) => {
          return player.type === "Goalie" ? (
            <div
              key={player.id}
              onClick={() => history.push(`/players/${player.id}`)}
              className="SingleTeam"
            >
              <span>{player.name}</span>
            </div>
          ) : null;
        })}
      </div>
    </>
  ) : (
   <Loading/>
  );
};

export default Roster;

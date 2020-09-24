import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useNHLService } from "../NHLContext";
import { createTeamPieChart } from "../../utilities/standings/createTeamPieChart";

import Roster from "./teams/Roster";

import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const SingleTeam = () => {
  const params = useParams();
  const svgRef = useRef();

  const [teamData, setTeamData] = useState();
  const [teamFavorited, setTeamFavorited] = useState();

  const NHLService = useNHLService();

  const loggedIn = NHLService.checkLogin();

  const handleFavoriteClick = () => {
    if (teamFavorited) {
      NHLService.removeFavoriteTeam(parseInt(params.id));
      setTeamFavorited(false);
    } else {
      NHLService.addFavoriteTeam(parseInt(params.id));
      setTeamFavorited(true);
    }
  };

  useEffect(() => {
    NHLService.getStandings().then(async (result) => {
      let leagueArray = result.data[0].concat(
        result.data[1],
        result.data[2],
        result.data[3]
      );

      const data = await leagueArray.filter(
        (team) => team.team.id === parseInt(params.id)
      );

      setTeamData(data);
      createTeamPieChart(svgRef, data);
      if (loggedIn) {
        NHLService.checkIfTeamIsFavorited(parseInt(params.id)).then((result) =>
          setTeamFavorited(result)
        );
      }
    });
  }, [NHLService, params.id, loggedIn]);

  return teamData ? (
    <div className="TeamViewFull">
      {loggedIn ? (
        teamFavorited ? (
          <button className="FavoriteButton" onClick={handleFavoriteClick}>
            <StarIcon fontSize="small" />
          </button>
        ) : (
          <button className="FavoriteButton" onClick={handleFavoriteClick}>
            <StarBorderIcon fontSize="small" />{" "}
          </button>
        )
      ) : null}
      <h1>{teamData[0].team.name}</h1>

      <div className="PieChartGP">
        <svg ref={svgRef} className="PieChart"></svg>
        <div className="PlayerStats">
          <div className="MinorStat">
            <h3> {teamData[0].gamesPlayed}</h3>
            <span>GP</span>
          </div>
          <div className="MinorStat">
            <h3> {teamData[0].goalsScored}</h3>
            <span>GS</span>
          </div>
          <div className="MinorStat">
            <h3> {teamData[0].goalsAgainst}</h3>
            <span>GA</span>
          </div>
        </div>
      </div>
      <Roster teamId={params.id} />
    </div>
  ) : null;
};

export default SingleTeam;

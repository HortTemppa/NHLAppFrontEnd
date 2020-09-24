import React, { useEffect, useState, useRef } from "react";
import { useNHLService } from "../../NHLContext";
import { sortRawDataAscending } from "../../../utilities/standings/dataSorts";
import { createTeamPieChart } from "../../../utilities/standings/createTeamPieChart";
import Loading from "../../Loading";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { useHistory } from "react-router-dom";

const StandingsView = ({ selectedTeam, rawData, chartType }) => {
  const NHLService = useNHLService();

  const [teamFavorited, setTeamFavorited] = useState();

  const history = useHistory();

  const loggedIn = NHLService.checkLogin();

  const [teamInfo, setTeamInfo] = useState([]);
  const [teamData, setTeamData] = useState();

  const svgRef = useRef();

  const handleFavoriteClick = () => {
    if (teamFavorited) {
      NHLService.removeFavoriteTeam(selectedTeam);
      setTeamFavorited(false);
    } else {
      NHLService.addFavoriteTeam(selectedTeam);
      setTeamFavorited(true);
    }
  };

  const handleTeamPageClick = () => {
    history.push(`/teams/${selectedTeam}`);
  };

  useEffect(() => {
    if (selectedTeam) {
      NHLService.getTeam(selectedTeam).then(async (result) => {
        setTeamInfo(result.data);
        let data = await sortRawDataAscending(rawData, chartType);

        data = await data.filter((team) => team.team.id === selectedTeam);

        await setTeamData(data);
        createTeamPieChart(svgRef, data);

        if (loggedIn) {
          NHLService.checkIfTeamIsFavorited(selectedTeam).then((result) =>
            setTeamFavorited(result)
          );
        }
      });
    }
  }, [selectedTeam, rawData, chartType, NHLService, loggedIn]);

  return teamData ? (
    <div className="TeamView">
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
      <div className="ButtonWrapper">
        <button onClick={handleTeamPageClick}>Full Team Page</button>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default StandingsView;

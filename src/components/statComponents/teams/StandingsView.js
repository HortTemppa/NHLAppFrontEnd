import React, { useEffect, useState, useRef } from "react";
import { useNHLService } from "../../NHLContext";
import { sortRawDataAscending } from "../../../utilities/standings/dataSorts";
import { createTeamPieChart } from "../../../utilities/standings/createTeamPieChart";

const StandingsView = ({ selectedTeam, rawData, chartType }) => {
  const NHLService = useNHLService();

  const [teamInfo, setTeamInfo] = useState([]);
  const [teamData, setTeamData] = useState();

  const svgRef = useRef();

  useEffect(() => {
    if (selectedTeam) {
      NHLService.getTeam(selectedTeam).then(async (result) => {
        setTeamInfo(result.data);
        let data = await sortRawDataAscending(rawData, chartType);

        data = await data.filter((team) => team.team.id === selectedTeam);

        await setTeamData(data);
        createTeamPieChart(svgRef, data);
      });
    }
  }, [selectedTeam, rawData, chartType, NHLService]);

  return teamData ? (
    <div className="TeamView">
      <h1>{teamData[0].team.name}</h1>

      <div className="PieChartGP">
        <svg ref={svgRef} className="PieChart"></svg>
        <div className="GamesPlayed">
          <span>Games Played: {teamData[0].gamesPlayed}</span>Goals Scored:{" "}
          {teamData[0].goalsScored}
          <span>
            <span>Goals Against: {teamData[0].goalsAgainst}</span>
          </span>
        </div>
      </div>
    </div>
  ) : null;
};

export default StandingsView;

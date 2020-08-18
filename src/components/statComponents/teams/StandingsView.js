import React, { useEffect, useState, useRef } from "react";
import { useNHLService } from "../../NHLContext";
import { sortRawDataAscending } from "../../../utilities/dataSorts";
import { createTeamPieChart } from "../../../utilities/createTeamPieChart";

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
        console.log(data);
        await setTeamData(data);
        createTeamPieChart(svgRef, data);
      });
    }
  }, [selectedTeam, rawData, chartType]);

  console.log("info:", teamInfo);
  console.log("Data:", teamData);
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

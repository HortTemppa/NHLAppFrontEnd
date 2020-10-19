import React, { useRef, useEffect, useState } from "react";
import { sortRawDataAscending } from "../../../utilities/standings/dataSorts";
import { createTeamPieChart } from "../../../utilities/standings/createTeamPieChart";
import { useNHLService } from "../../NHLContext";

import Loading from "../../Loading";

const TeamStats = ({ selectedTeam, rawData, chartType }) => {
  const svgRef = useRef();
  const NHLService = useNHLService();

  const [teamData, setTeamData] = useState();

  useEffect(() => {
    if (!selectedTeam) {
      return;
    }

    NHLService.getTeam(selectedTeam).then(async (result) => {
      let data = await sortRawDataAscending(rawData, chartType);


      data = await data.filter(
        (team) => team.team.id === parseInt(selectedTeam)
      );

      await setTeamData(data);
      createTeamPieChart(svgRef, data);
    });
  }, [NHLService, selectedTeam, rawData, chartType]);


  return teamData ? (
    <>
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
    </>
  ) : (
    <Loading />
  );
};

export default TeamStats;

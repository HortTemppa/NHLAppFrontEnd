import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNHLService } from "../NHLContext";

import { useSpring, animated } from "react-spring";

import Roster from "./teams/Roster";
import Loading from "../Loading";
import FavoriteTeam from "./teams/FavoriteTeam";
import TeamStats from "./teams/TeamStats";

const SingleTeam = () => {
  const params = useParams();

  const [rawData, setRawData] = useState();

  const NHLService = useNHLService();

  const props = useSpring({
    position: "relative",
    top: "0px",
    opacity: "1",
    from: { top: "-25px", opacity: "0" },
  });

  useEffect(() => {
    NHLService.getStandings().then((result) => {
      setRawData(result.data);
    });
  }, []);

  return rawData ? (
    <animated.div style={props} className="TeamViewFull">
      <FavoriteTeam selectedTeam={params.id} />
      <TeamStats rawData={rawData} chartType={6} selectedTeam={params.id} />
      <Roster teamId={params.id} />
    </animated.div>
  ) : (
    <Loading />
  );
};

export default SingleTeam;

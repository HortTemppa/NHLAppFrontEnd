import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { useNHLService } from "../NHLContext";

import Loading from "../Loading";
import FullPlayerView from "./playerstats/FullPlayerView";

const SinglePlayer = ({}) => {
  const params = useParams();

  const [playerData, setPlayerData] = useState();

  const NHLService = useNHLService();

  useEffect(() => {
    NHLService.getPlayer(parseInt(params.id))
      .then((result) => {
        setPlayerData(result.data);
      })
      .catch((error) => console.log(error));
  }, [params.id, NHLService]);

  console.log(playerData);

  return playerData ? <FullPlayerView data={playerData} /> : <Loading />;
};

export default SinglePlayer;

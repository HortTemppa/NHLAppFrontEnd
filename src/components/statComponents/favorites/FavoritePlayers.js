import Axios from "axios";
import React, { useEffect, useState } from "react";
import NHLService from "../../../services/NHLService";
import Loading from "../../Loading";
import { useNHLService } from "../../NHLContext";

const FavoritePlayers = ({}) => {
  const NHLService = useNHLService();

  const [favoritePlayers, setFavoritePlayers] = useState();

  useEffect(() => {
    async function getFavorites() {
      const players = await NHLService.getFavoritePlayers();
      setFavoritePlayers(players);
    }

    getFavorites();
  }, [NHLService]);

  console.log(favoritePlayers);

  return favoritePlayers ? (
    <>
      <h1>Favorite Players</h1>
      <div className="TeamWrapper">
        {favoritePlayers.map((player) => {
          return player ? (
            <div key={player.id} className="SingleTeam">
              <span>{player.name}</span>
            </div>
          ) : null;
        })}
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default FavoritePlayers;

import React, { useEffect, useState } from "react";

import { useSpring, animated } from "react-spring";


import { useNHLService } from "../../NHLContext";

import PlayerStats from "./PlayerStats";
import SelectFavorite from "./SelectFavorite";
import Loading from "../../Loading";


const FavoritePlayers = () => {
  const NHLService = useNHLService();

  const [favoritePlayers, setFavoritePlayers] = useState();

  const [playerOneIndex, setPlayerOneIndex] = useState();
  const [playerTwoIndex, setPlayerTwoIndex] = useState();

  const handlePlayerOneChange = (event) => {
    setPlayerOneIndex(event.target.value);
  };

  const handlePlayerTwoChange = (event) => {
    setPlayerTwoIndex(event.target.value);
  };

  useEffect(() => {
    async function getFavorites() {
      const players = await NHLService.getFavoritePlayers();
      setFavoritePlayers(players);
    }

     getFavorites();
  }, [NHLService]);

  const props = useSpring({
    position: "relative",
    top: "0px",
    opacity: "1",
    from: { top: "-25px", opacity: "0"},
  });  


  return favoritePlayers ? (
   <> <animated.div style={props} className = "PlayerWrapper" >
      <h3 style={{ textAlign: "center"}}>
        Compare Players
      </h3>
      <div className="ComparePlayer">
        <div>
          <SelectFavorite favorites = {favoritePlayers} handleChange = {handlePlayerOneChange}/>
            <PlayerStats data = {favoritePlayers[playerOneIndex]}/>
        </div>
        <div>
          <SelectFavorite favorites = {favoritePlayers} handleChange ={handlePlayerTwoChange}/>
           <PlayerStats data = {favoritePlayers[playerTwoIndex]}/>
        </div>
      </div>
    </animated.div>
    </>
  ) : (
    <Loading />
  );
};

export default FavoritePlayers;

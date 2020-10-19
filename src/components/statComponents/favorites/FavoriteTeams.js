import React, { useState, useEffect } from "react";

import { useSpring, animated } from "react-spring";
import { useHistory } from "react-router-dom";

import Loading from "../../Loading";
import { useNHLService } from "../../NHLContext";


const FavoriteTeams = () => {

const NHLService = useNHLService();

  const [favoriteTeams, setFavoriteTeams] = useState();

  const history = useHistory();

  const props = useSpring({
    position: "relative",
    top: "0px",
    opacity: "1",
    from: { top: "-25px", opacity: "0" },
  });

  useEffect(() => {
    async function getFavorites() {
      const teams = await NHLService.getFavoriteTeams();
      setFavoriteTeams(teams);
    }

    getFavorites();
  }, [NHLService]);

  


  return favoriteTeams ? ( <animated.div style = {props} className = "PlayerWrapper"> <h3 style={{ textAlign: "center"}}>
  Favorite Teams
</h3>
<div className = "FavoriteTeamWrapper">
 {favoriteTeams.map((team) => {
   if(!team ){
     return null
   }
     return <div
     key={team.id}
     onClick={() => history.push(`/teams/${team.id}`)}
     className="SingleTeam"
   >
     <span>{team.name}</span>
   </div>

 })}</div>
 </animated.div>):(<Loading/>)
};

export default FavoriteTeams;

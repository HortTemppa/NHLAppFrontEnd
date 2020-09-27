import React from "react";

import { useSpring, animated } from "react-spring";

import PlayerHeader from "./PlayerHeader";
import FieldPlayer from "./FieldPlayer";
import Goalie from "./Goalie";
import PlayerFavoriteButton from "./PlayerFavoriteButton";
import NoGames from "./NoGames";

import Loading from "../../Loading";

const FullPlayerView = ({ data }) => {
  const props = useSpring({
    position: "relative",
    top: "0px",
    opacity: "1",
    from: { top: "-25px", opacity: "0" },
  });

  return data ? (
    <>
      <animated.div style={props} className="PlayerWrapper">
        <PlayerFavoriteButton playerId={data[0].id} />
        <PlayerHeader data={data[0]} />
        {data[0].games && data[0].position !== "Goalie" ? (
          <FieldPlayer data={data[0]} />
        ) : data[0].games ? (
          <Goalie data={data[0]} />
        ) : (
          <NoGames />
        )}
      </animated.div>
    </>
  ) : (
    <Loading />
  );
};

export default FullPlayerView;

import React, { useEffect, useState } from "react";
import { useNHLService } from "../../NHLContext";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const PlayerView = ({ data, handleStatClick, state }) => {
  const [playerFavorited, setPlayerFavorited] = useState();

  const NHLService = useNHLService();
  const loggedIn = NHLService.checkLogin();

  console.log(data);

  const handleFavoriteClick = () => {
    if (playerFavorited) {
      NHLService.removeFavoritePlayer(data.playerId);
      setPlayerFavorited(false);
    } else {
      NHLService.addFavoritePlayer(data.playerId);
      setPlayerFavorited(true);
    }
  };

  useEffect(() => {
    if (!loggedIn) {
      return;
    }

    NHLService.checkIfPlayerIsFavorited(data.playerId).then((result) =>
      setPlayerFavorited(result)
    );
  }, [NHLService, loggedIn, data]);

  const classHandler = (type) => {
    if (state === type) {
      return "SelectedStat";
    } else {
      return "Stat";
    }
  };

  return (
    <>
      <div className="PlayerWrapper">
        {loggedIn ? (
          playerFavorited ? (
            <button className="FavoriteButton" onClick={handleFavoriteClick}>
              <StarIcon fontSize="small" />
            </button>
          ) : (
            <button className="FavoriteButton" onClick={handleFavoriteClick}>
              <StarBorderIcon fontSize="small" />{" "}
            </button>
          )
        ) : null}
        <div className="PlayerNameTeam">
          <h2>{data.skaterFullName}</h2>
          <span>{data.teamAbbrevs}</span>
        </div>
        <div className="PlayerStats">
          <div
            onClick={() => handleStatClick("points")}
            className={classHandler("points")}
          >
            <h3>{data.points}</h3>
            <span>points</span>
          </div>
          <div
            onClick={() => handleStatClick("goals")}
            className={classHandler("goals")}
          >
            <h3>{data.goals}</h3>
            <span>goals</span>
          </div>
          <div
            onClick={() => handleStatClick("assists")}
            className={classHandler("assists")}
          >
            <h3>{data.assists}</h3>
            <span>assists</span>
          </div>
          {state === "points" ? (
            <>
              <div className="MinorStat">
                <h3>{data.evPoints}</h3>
                <span>EV points</span>
              </div>
              <div className="MinorStat">
                <h3>{data.ppPoints}</h3>
                <span>PP points</span>
              </div>
              <div className="MinorStat">
                <h3>{data.shPoints}</h3>
                <span>SH points</span>
              </div>
            </>
          ) : state === "goals" ? (
            <>
              <div className="MinorStat">
                <h3>{data.evGoals}</h3>
                <span>EV goals</span>
              </div>
              <div className="MinorStat">
                <h3>{data.ppGoals}</h3>
                <span>PP goals</span>
              </div>
              <div className="MinorStat">
                <h3>{data.shGoals}</h3>
                <span>SH goals</span>
              </div>
            </>
          ) : (
            <>
              <div className="MinorStat">
                <h3>{(data.shootingPct * 100).toFixed(1)}%</h3>
                <span>Shot-%</span>
              </div>
              <div className="MinorStat">
                <h3>{data.pointsPerGame.toFixed(2)}</h3>
                <span>PPG</span>
              </div>
              <div className="MinorStat">
                <h3>{(data.faceoffWinPct * 100).toFixed(1)}%</h3>
                <span>Faceoffs</span>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PlayerView;

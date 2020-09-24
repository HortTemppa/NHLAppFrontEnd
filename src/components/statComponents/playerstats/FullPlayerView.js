import React, { useState, useEffect } from "react";
import { useNHLService } from "../../NHLContext";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const FullPlayerView = ({ data }) => {
  const [playerFavorited, setPlayerFavorited] = useState();

  const [playerStatState, setPlayerStatState] = useState("assists");

  const handleStatClick = (state) => {
    return setPlayerStatState(state);
  };

  const NHLService = useNHLService();
  const loggedIn = NHLService.checkLogin();

  const handleFavoriteClick = () => {
    if (playerFavorited) {
      NHLService.removeFavoritePlayer(parseInt(data[0].id));
      setPlayerFavorited(false);
    } else {
      NHLService.addFavoritePlayer(parseInt(data[0].id));
      setPlayerFavorited(true);
    }
  };

  useEffect(() => {
    if (!loggedIn) {
      return;
    }

    NHLService.checkIfPlayerIsFavorited(parseInt(data[0].id)).then((result) =>
      setPlayerFavorited(result)
    );
  }, [NHLService, loggedIn, data]);

  const classHandler = (type) => {
    if (playerStatState === type) {
      return "SelectedStat";
    } else {
      return "Stat";
    }
  };

  console.log(data);

  return data ? (
    <>
      <div className="PlayerWrapper">
        {loggedIn ? (
          playerFavorited ? (
            <button className="FavoriteButton" onClick={handleFavoriteClick}>
              <StarIcon fontSize="small" />
            </button>
          ) : (
            <button className="FavoriteButton" onClick={handleFavoriteClick}>
              <StarBorderIcon fontSize="small" />
            </button>
          )
        ) : null}
        <div className="PlayerNameTeam">
          <h2>{data[0].name}</h2>
          <h3>{data[0].team}</h3>
        </div>
        {data[0].games && data[0].position !== "Goalie" ? (
          <div className="PlayerStats">
            <div
              onClick={() => handleStatClick("points")}
              className={classHandler("points")}
            >
              <h3>{data[0].points}</h3>
              <span>points</span>
            </div>
            <div
              onClick={() => handleStatClick("goals")}
              className={classHandler("goals")}
            >
              <h3>{data[0].goals}</h3>
              <span>goals</span>
            </div>
            <div
              onClick={() => handleStatClick("assists")}
              className={classHandler("assists")}
            >
              <h3>{data[0].assists}</h3>
              <span>assists</span>
            </div>
            {playerStatState === "points" ? (
              <>
                <div className="MinorStat">
                  <h3>{data[0].timeOnIcePerGame}</h3>
                  <span>TOI/G</span>
                </div>
                <div className="MinorStat">
                  <h3>{data[0].powerPlayPoints}</h3>
                  <span>PP points</span>
                </div>
                <div className="MinorStat">
                  <h3>{data[0].plusMinus}</h3>
                  <span>+/-</span>
                </div>
              </>
            ) : playerStatState === "goals" ? (
              <>
                <div className="MinorStat">
                  <h3>{data[0].shotPct.toFixed(1)}%</h3>
                  <span>Shot-%</span>
                </div>
                <div className="MinorStat">
                  <h3>{data[0].powerPlayGoals}</h3>
                  <span>PP goals</span>
                </div>
                <div className="MinorStat">
                  <h3>{data[0].shots}</h3>
                  <span>Shots</span>
                </div>
              </>
            ) : (
              <>
                <div className="MinorStat">
                  <h3>{data[0].pim}</h3>
                  <span>PIM</span>
                </div>
                <div className="MinorStat">
                  <h3>{data[0].pointsPerGame.toFixed(2)}</h3>
                  <span>PPG</span>
                </div>
                <div className="MinorStat">
                  <h3>{data[0].faceOffPct.toFixed(1)}%</h3>
                  <span>Faceoffs</span>
                </div>
              </>
            )}
          </div>
        ) : data[0].games ? (
          <div className="PlayerStats">
            <div
              onClick={() => handleStatClick("points")}
              className={classHandler("points")}
            >
              <h3>{(data[0].savePercentage * 100).toFixed(2)}</h3>
              <span>Save-%</span>
            </div>
            <div
              onClick={() => handleStatClick("goals")}
              className={classHandler("goals")}
            >
              <h3>{data[0].wins}</h3>
              <span>Wins</span>
            </div>
            <div
              onClick={() => handleStatClick("assists")}
              className={classHandler("assists")}
            >
              <h3>{data[0].losses + data[0].ot}</h3>
              <span>Losses</span>
            </div>
            {playerStatState === "points" ? (
              <>
                <div className="MinorStat">
                  <h3>{data[0].games}</h3>
                  <span>Games</span>
                </div>
                <div className="MinorStat">
                  <h3>{(data[0].saves / data[0].games).toFixed(2)}</h3>
                  <span>Saves/G</span>
                </div>
                <div className="MinorStat">
                  <h3>{data[0].shutouts}</h3>
                  <span>Shutouts</span>
                </div>
              </>
            ) : playerStatState === "goals" ? (
              <>
                <div className="MinorStat">
                  <h3>{((data[0].wins / data[0].games) * 100).toFixed(2)}%</h3>
                  <span>Win-%</span>
                </div>
                <div className="MinorStat">
                  <h3>{data[0].goalAgainstAverage.toFixed(2)}</h3>
                  <span>GA/G</span>
                </div>
                <div className="MinorStat">
                  <h3>{data[0].shortHandedSavePercentage.toFixed(2)}</h3>
                  <span>SH-Save-%</span>
                </div>
              </>
            ) : (
              <>
                <div className="MinorStat">
                  <h3>{data[0].ot}</h3>
                  <span>OT-losses</span>
                </div>
                <div className="MinorStat">
                  <h3>{data[0].goalsAgainst}</h3>
                  <span>GA</span>
                </div>
                <div className="MinorStat">
                  <h3>{data[0].saves}</h3>
                  <span>Saves</span>
                </div>
              </>
            )}
          </div>
        ) : (
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <span>Stats data is not available.</span>
          </div>
        )}
      </div>
    </>
  ) : null;
};

export default FullPlayerView;

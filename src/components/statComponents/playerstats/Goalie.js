import React, { useState } from "react";

const Goalie = ({ data }) => {
  const [playerStatState, setPlayerStatState] = useState("assists");

  const handleStatClick = (state) => {
    return setPlayerStatState(state);
  };

  const classHandler = (type) => {
    if (playerStatState === type) {
      return "SelectedStat";
    } else {
      return "Stat";
    }
  };

  return (
    <div className="PlayerStats">
      <div
        onClick={() => handleStatClick("points")}
        className={classHandler("points")}
      >
        <h3>{(data.savePercentage * 100).toFixed(2)}</h3>
        <span>Save-%</span>
      </div>
      <div
        onClick={() => handleStatClick("goals")}
        className={classHandler("goals")}
      >
        <h3>{data.wins}</h3>
        <span>Wins</span>
      </div>
      <div
        onClick={() => handleStatClick("assists")}
        className={classHandler("assists")}
      >
        <h3>{data.losses + data.ot}</h3>
        <span>Losses</span>
      </div>
      {playerStatState === "points" ? (
        <>
          <div className="MinorStat">
            <h3>{data.games}</h3>
            <span>Games</span>
          </div>
          <div className="MinorStat">
            <h3>{(data.saves / data.games).toFixed(2)}</h3>
            <span>Saves/G</span>
          </div>
          <div className="MinorStat">
            <h3>{data.shutouts}</h3>
            <span>Shutouts</span>
          </div>
        </>
      ) : playerStatState === "goals" ? (
        <>
          <div className="MinorStat">
            <h3>{((data.wins / data.games) * 100).toFixed(2)}%</h3>
            <span>Win-%</span>
          </div>
          <div className="MinorStat">
            <h3>{data.goalAgainstAverage.toFixed(2)}</h3>
            <span>GA/G</span>
          </div>
          <div className="MinorStat">
            <h3>{data.shortHandedSavePercentage.toFixed(2)}</h3>
            <span>SH-Save-%</span>
          </div>
        </>
      ) : (
        <>
          <div className="MinorStat">
            <h3>{data.ot}</h3>
            <span>OT-losses</span>
          </div>
          <div className="MinorStat">
            <h3>{data.goalsAgainst}</h3>
            <span>GA</span>
          </div>
          <div className="MinorStat">
            <h3>{data.saves}</h3>
            <span>Saves</span>
          </div>
        </>
      )}
    </div>
  );
};

export default Goalie;

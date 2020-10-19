import React, { useState } from "react";

const FieldPlayer = ({ data }) => {
  const [playerStatState, setPlayerStatState] = useState("points");

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
      {playerStatState === "points" ? (
        <>
          <div className="MinorStat">
            <h3>{data.timeOnIcePerGame}</h3>
            <span>TOI/G</span>
          </div>
          <div className="MinorStat">
            <h3>{data.powerPlayPoints}</h3>
            <span>PP points</span>
          </div>
          <div className="MinorStat">
            <h3>{data.plusMinus}</h3>
            <span>+/-</span>
          </div>
        </>
      ) : playerStatState === "goals" ? (
        <>
          <div className="MinorStat">
            <h3>{data.shotPct.toFixed(1)}%</h3>
            <span>Shot-%</span>
          </div>
          <div className="MinorStat">
            <h3>{data.powerPlayGoals}</h3>
            <span>PP goals</span>
          </div>
          <div className="MinorStat">
            <h3>{data.shots}</h3>
            <span>Shots</span>
          </div>
        </>
      ) : (
        <>
          <div className="MinorStat">
            <h3>{data.pim}</h3>
            <span>PIM</span>
          </div>
          <div className="MinorStat">
            <h3>{data.pointsPerGame.toFixed(2)}</h3>
            <span>PPG</span>
          </div>
          <div className="MinorStat">
            <h3>{data.faceOffPct.toFixed(1)}%</h3>
            <span>Faceoffs</span>
          </div>
        </>
      )}
    </div>
  );
};

export default FieldPlayer;

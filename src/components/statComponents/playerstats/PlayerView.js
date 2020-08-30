import React from "react";

const PlayerView = ({ data, handleStatClick, state }) => {
  return (
    <>
      <div className="PlayerWrapper">
        <div className="PlayerNameTeam">
          <h2>{data.skaterFullName}</h2>
          <span>{data.teamAbbrevs}</span>
        </div>
        <div className="PlayerStats">
          <div onClick={() => handleStatClick("points")} className="Stat">
            <h3>{data.points}</h3>
            <span>points</span>
          </div>
          <div onClick={() => handleStatClick("goals")} className="Stat">
            <h3>{data.goals}</h3>
            <span>goals</span>
          </div>
          <div onClick={() => handleStatClick("assists")} className="Stat">
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

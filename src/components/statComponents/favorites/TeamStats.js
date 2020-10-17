import React from 'react'

const TeamStats = ({data}) => {

    return <div className="CompareStats">
    <div className="Stat">
    <h3>{data.points}</h3>
    <span>points</span>
        </div>
    <div className="Stat">
    <h3>{data.goals}</h3>
    <span>goals</span>
</div>
    <div className="Stat">
    <h3>{data.assists}</h3>
    <span>assists</span>
        </div>
            </div>
}

export default TeamStats
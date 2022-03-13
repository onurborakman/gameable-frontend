import React from 'react'

const Profiles = (props) => {
    //Props
    const [steam, discord, uplay, origin, battleNet, playstation, xbox] = props.profiles;
    const {handleSteam, handleDiscord, handleUplay, handleOrigin, handleBattleNet, handlePlaystation, handleXbox} = props;
    
  return (
    <div>
          {/* Steam URL */}
          <label>
              Steam URL:
              <input type="text" value={steam} onChange={handleSteam} />
          </label>
          {/* Discord URL */}
          <label>
              Discord URL:
              <input type="text" value={discord} onChange={handleDiscord} />
          </label>
          {/* UPlay URL */}
          <label>
              UPlay URL:
              <input type="text" value={uplay} onChange={handleUplay} />
          </label>
          {/* Origin URL */}
          <label>
              Origin URL:
              <input type="text" value={origin} onChange={handleOrigin} />
          </label>
          {/* Battle.net URL */}
          <label>
              Battle.net URL:
              <input type="text" value={battleNet} onChange={handleBattleNet} />
          </label>
          {/* Playstation Network URL */}
          <label>
              Playstation Network URL:
              <input type="text" value={playstation} onChange={handlePlaystation} />
          </label>
          {/* Xbox Live URL */}
          <label>
              XBOX Live URL:
              <input type="text" value={xbox} onChange={handleXbox} />
          </label>
    </div>
  )
}

export default Profiles
import React from 'react'

export default function GameCard(props) {
  const {game} = props
  //JSX
  return (
    <div className='game-card'>
      <div className='title'><h3><b>{game.name}</b></h3></div>
      <p>Rank: {game.ranks}</p>
      <p>Role: {game.roles}</p>
    </div>
  )
}

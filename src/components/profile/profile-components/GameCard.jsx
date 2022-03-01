import axios from 'axios'
import React, { useState, useEffect } from 'react'

export default function GameCard(props) {
  const {game} = props
  return (
    <div>
    { game.name }
    <ul>
      <li>Rank: {game.ranks}</li>
      <li>Role: {game.roles}</li>
    </ul>
    </div>
  )
}

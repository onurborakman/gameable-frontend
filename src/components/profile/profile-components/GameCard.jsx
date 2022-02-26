import axios from 'axios'
import React, { useState, useEffect } from 'react'

export default function GameCard(props) {
  const [game, setGame] = useState('');
  const [rank, setRank] = useState('');
  const [role, setRole] = useState('');

  useEffect(()=>{
    getGame();
    getRank();
    getRole();
  },[]);
  const getGame = async() => {
    const data = await axios.get(`https://gameable-api.herokuapp.com/api/game/${props.game[0]}`);
    const game = await data.data.data;
    console.log(game)
    setGame(game);
  } 
  const getRank = async() => {
    const data = await axios.get(`https://gameable-api.herokuapp.com/api/rank/${props.game[1]}`);
    const rank = await data.data.data;
    console.log(rank.image)
    setRank(rank)
  }

  const getRole = async() => {
    const data = await axios.get(`https://gameable-api.herokuapp.com/api/role/${props.game[2]}`);
    const role = await data.data.data;
    console.log(role)
    setRole(role);
  }
  return (
    <div>
      <img src={rank.image} alt={rank.name}/>
      <div>
        <p>{game.name}</p>
        <p>{role.name}</p>
      </div>
    </div>
  )
}

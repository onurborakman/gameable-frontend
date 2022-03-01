import axios from 'axios'
import React, {useState, useEffect} from 'react'

const Games = (props) => {
    const [gameList, setGameList] = useState([])
    const [selectedGame, setSelectedGame] = useState('');
    const [selectedRank, setSelectedRank] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const {handleAddGame} = props;
    useEffect(()=>{
        allGames()
    },[])
    const allGames = async() => {
        const data = await axios.get(`https://gameable-api.herokuapp.com/api/game/all`);
        const games = await data.data.data;
        setGameList(games);
    }
    const gameOptions = gameList.map(game=><option value={JSON.stringify(game)}>{game.name}</option>)
    const rankOptions = () => selectedGame && selectedGame.ranks.map(rank=><option value={rank}>{rank}</option>)
    const roleOptions = () => selectedGame && selectedGame.roles.map(role=><option value={role}>{role}</option>)
    const handleGameChange = (e) => {
        setSelectedGame(JSON.parse(e.target.value));
    }
    const handleRankChange = (e) => {
        setSelectedRank(e.target.value);
    }
    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const game = {
            id: selectedGame.id,
            name: selectedGame.name,
            ranks: [selectedRank],
            roles: [selectedRole]
        }
        handleAddGame(game);
    }

  return (
    <div>
        <select onChange={handleGameChange}>
            <option value={''}>Please select a game</option>
            {gameOptions}
        </select>
        {selectedGame !== '' &&
        <select onChange={handleRankChange}>
            <option value={''}>Please select a rank</option>
            {rankOptions()}
        </select>
        }
        {selectedRank &&
        <select onChange={handleRoleChange}>
            <option value={''}>Please select a role</option>
            {roleOptions()}
        </select>
        }
        <button onClick={handleSubmit}>Add Game</button>
    </div>
  )
}

export default Games
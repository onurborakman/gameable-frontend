import axios from 'axios'
import React, {useState, useEffect} from 'react'

const Games = (props) => {
    //States
    const [gameList, setGameList] = useState([])
    const [selectedGame, setSelectedGame] = useState('');
    const [selectedRank, setSelectedRank] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    //Props
    const {handleAddGame} = props;
    useEffect(()=>{
        allGames()
    },[])
    const allGames = async() => {
        const data = await axios.get(`https://gameable-api.herokuapp.com/api/game/all`);
        const games = await data.data.data;
        setGameList(games);
    }
    //Creating the options for games dropdown
    const gameOptions = gameList.map(game=><option value={JSON.stringify(game)}>{game.name}</option>)
    //Creating the rank options depending on the selected game
    const rankOptions = () => selectedGame && selectedGame.ranks.map(rank=><option value={rank}>{rank}</option>)
    //Creating the role option depending on the selected game
    const roleOptions = () => selectedGame && selectedGame.roles.map(role=><option value={role}>{role}</option>)
    //Handlers to update the states on change
    const handleGameChange = (e) => {
        setSelectedGame(JSON.parse(e.target.value));
    }
    const handleRankChange = (e) => {
        setSelectedRank(e.target.value);
    }
    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    }
    //Function to handle submission
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
    <div className='game-selection-box'>
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
          <button onClick={handleSubmit} className='button'><span>Add</span></button>
    </div>
  )
}

export default Games
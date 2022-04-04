import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useAuth } from '../../login/Authentication'

const Games = (props) => {
    const auth = useAuth();
    //States
    const [gameList, setGameList] = useState([])
    const [selectedGame, setSelectedGame] = useState('');
    const [selectedRank, setSelectedRank] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [checkout, setCheckout] = useState(auth.user.games);
    const [message, setMessage] = useState('');
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
    const gameOptions = gameList.map(game => <option value={JSON.stringify(game)} key={JSON.stringify(game)
}>{game.name}</option>)
    //Creating the rank options depending on the selected game
    const rankOptions = () => selectedGame && selectedGame.ranks.map(rank=><option value={rank} key={rank}>{rank}</option>)
    //Creating the role option depending on the selected game
    const roleOptions = () => selectedGame && selectedGame.roles.map(role=><option value={role} key={role}>{role}</option>)
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
        if(checkout.filter(e=>e.name===game.name).length === 0){
            setCheckout([...checkout, game]);
            handleAddGame(game);
        }else{
            setMessage('Game has already been added. Please select a different game');
        }
    }

  return (
    <div className='game-selection-box'>
        {message && <p>{message}</p>}
        <select onChange={handleGameChange} defaultValue={''}>
              <option value={''} selected disabled hidden key={''}>Please select a game</option>
            {gameOptions}
        </select>
        {selectedGame !== '' &&
              <select onChange={handleRankChange} defaultValue={''} >
                  <option value={''} selected disabled hidden key={''}>Please select a rank</option>
            {rankOptions()}
        </select>
        }
        {selectedRank &&
        <select onChange={handleRoleChange} defaultValue={''}>
                  <option value={''} selected disabled hidden key={''}>Please select a role</option>
            {roleOptions()}
        </select>
        }
          <button onClick={handleSubmit} className='button' disabled={!selectedRole && "disabled"}><span>Add</span></button>
    </div>
  )
}

export default Games
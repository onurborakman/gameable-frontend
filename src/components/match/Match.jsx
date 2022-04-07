import React, {useState} from 'react';
import { useAuth } from '../login/Authentication'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HomeVideo3 from '../../assets/videos/home3.mp4';

export default function Match() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [selectedGame, setSelectedGame] = useState('');

  const getGameOptions = () => {
    return auth.user.games &&
    auth.user.games.map((game) => {
      return(
        <option value={game.name} key={game.name}>{game.name}</option>
      )
    }) 
  }

  const handleSelectedGameChange = (e) => {
    e.preventDefault();
    setSelectedGame(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    let gameToBePlayed = auth.user.games.filter((game)=>game.name === selectedGame);
    let match = {
      game: gameToBePlayed[0],
      questions: []
    }
    let user = {
      id: auth.user.id,
      username: auth.user.username,
      firstname: auth.user.firstname,
      lastname: auth.user.lastname,
      email: auth.user.email,
      bio: auth.user.bio,
      games: auth.user.games,
      languages: auth.user.languages,
      personalities: auth.user.personalities,
      nationality: auth.user.nationality,
      birthdate: auth.user.birthdate,
      profiles: auth.user.profiles,
      match: match,
      teams: auth.user.teams,
      password: auth.user.password,
      feedback: auth.user.feedback
    }
    auth.setUser(user);
    edit(user);
    navigate('/match/up')
  }

  const edit = async (updatedUser) => {
    await axios.patch(`https://gameable-api.herokuapp.com/api/user/update/${auth.user.id}`, updatedUser)
  }

  return (
  <div className='match'>
      <video autoPlay loop muted playsInline>
        <source src={HomeVideo3} type='video/mp4' />
      </video>
      <div className='overlay'></div>
    <form onSubmit={onSubmit}>
      <select onChange={handleSelectedGameChange} defaultValue={''} disabled={!auth.user.games || !auth.user.games.length ? 'disabled' : ''}>
        {
          auth.user.games && auth.user.games.length > 0
          ? <option value='' disabled hidden>Please select a game you want to play</option>
          : <option value='' disabled hidden>Please add a game to your profile</option>
        }
        {auth.user.games && getGameOptions()}
      </select>
      <button type='submit' disabled={!selectedGame && "disabled"} className='button'><span>MATCH UP!</span></button>
    </form>
  </div>
  );
}

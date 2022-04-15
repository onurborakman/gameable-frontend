import React, {useState} from 'react';
import { apikey, useAuth } from '../login/Authentication'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HomeVideo3 from '../../assets/videos/home3.mp4';

export default function Match() {
  //authenticated user
  const auth = useAuth();
  //navigation
  const navigate = useNavigate();
  //states
  const [selectedGame, setSelectedGame] = useState('');
  //create game options for dropdown
  const getGameOptions = () => {
    //return the user's games as optios
    return auth.user.games &&
    auth.user.games.map((game) => {
      return(
        <option value={game.name} key={game.name}>{game.name}</option>
      )
    }) 
  }
  //function to handle the selected game change
  const handleSelectedGameChange = (e) => {
    e.preventDefault();
    setSelectedGame(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    //retrieve the game
    let gameToBePlayed = auth.user.games.filter((game)=>game.name === selectedGame);
    //create the match
    let match = {
      game: gameToBePlayed[0],
      questions: []
    }
    //create an updated user
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
    //update the localStorage
    auth.setUser(user);
    //edit the user
    edit(user);
    //navigate user to the results page
    navigate('/match/up')
  }
  //function to edit the user
  const edit = async (updatedUser) => {
    //awaiting axios patch request
    await axios.patch(`http://gameable-api.herokuapp.com/api/user/update/${auth.user.id}`, updatedUser , apikey)
  }
  //JSX
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

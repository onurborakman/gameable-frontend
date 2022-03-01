import React, {useState, useEffect} from 'react';
import { useAuth } from '../login/Authentication';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Profiles from './edit-components/Profiles';
import Languages from './edit-components/Languages';
import Games from './edit-components/Games';
import Teams from './edit-components/Teams';
import Questions from './edit-components/Questions';

export default function ProfileEdit() {
  let auth = useAuth();
  let navigate = useNavigate();

  const [username, setUsername] = useState(auth.user.username);
  const [firstname, setFirstname] = useState(auth.user.firstname);
  const [lastname, setLastname] = useState(auth.user.lastname);
  const [email, setEmail] = useState(auth.user.email);
  const [bio, setBio] = useState(auth.user.bio);
  const [languages, setLanguages] = useState(auth.user.languages || []);
  const [password, setPassword] = useState(auth.user.password);
  const [games, setGames] = useState(auth.user.games || []);
  const [teams, setTeams] = useState(auth.user.teams || []);
  const [questions, setQuestions] = useState(auth.user.personalities || []);
  /* PROFILES SECTION */
  /*
    0-Steam
    1-Discord
    2-UPlay
    3-BattleNet
    4-Origin
    5-Playstation
    6-XBOX 
  */
  //Steam Link
  const [steam, setSteam] = useState(() =>{return(auth.user.profiles !== null ? auth.user.profiles[0] : '')});
  //Discord Link
  const [discord, setDiscord] = useState(() => { return (auth.user.profiles !== null ? auth.user.profiles[1] : '')});
  //Uplay Link
  const [uplay, setUplay] = useState(() => { return (auth.user.profiles !== null ? auth.user.profiles[2] : '')});
  //Battle.net Link
  const [battleNet, setBattleNet] = useState(() => { return (auth.user.profiles !== null ? auth.user.profiles[3] : '')});
  //Origin Link
  const [origin, setOrigin] = useState(() => { return (auth.user.profiles !== null ? auth.user.profiles[4] : '')});
  //Playstation Network Link
  const [playstation, setPlaystation] = useState(() => { return (auth.user.profiles !== null ? auth.user.profiles[5] : '')});
  //Xbox Live Link
  const [xbox, setXbox] = useState(() => { return (auth.user.profiles !== null ? auth.user.profiles[6] : '')});

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const edit = async(updatedUser) => {
    await axios.patch(`https://gameable-api.herokuapp.com/api/user/update/${auth.user.id}`, updatedUser)
  }

  const handleEdit = (e) => {
    e.preventDefault();
    let user = {
        id: auth.user.id,
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
        bio: bio,
        games: games,
        languages: languages,
        personalities: questions,
        profiles: [
          steam,
          discord,
          uplay,
          battleNet,
          origin,
          playstation,
          xbox
        ],
        matches: auth.user.matches,
        teams: teams,
        password: password
    }
    edit(user)
    auth.setUser(user);
    console.log(auth.user);
    navigate('/profile');
  }

  const handleUsername = (e) => {e.preventDefault();setUsername(e.target.value);}
  const handleFirstname = (e) => {e.preventDefault();setFirstname(e.target.value);}
  const handleLastname = (e) => {e.preventDefault();setLastname(e.target.value);}
  const handleEmail = (e) => {e.preventDefault();setEmail(e.target.value);}
  const handleBio = (e) => { e.preventDefault(); setBio(e.target.value); }
  const handlePassword = (e) => { e.preventDefault(); setPassword(e.target.value); }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /* LANGUAGES */
  const handlePrimaryLanguage = (e) => {
    e.preventDefault();
    const languageArr = [e.target.value, languages[1] || null];
    setLanguages(languageArr);
  }
  const handleSecondaryLanguage = (e) => {
    e.preventDefault();
    const languageArr = [languages[0] || null, e.target.value];
    setLanguages(languageArr);
  }
  const languageProps = {
    handlePrimaryLanguage: handlePrimaryLanguage,
    handleSecondayLanguage: handleSecondaryLanguage,
    languages: languages
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /* PROFILES */
  const handleSteam = (e) => {e.preventDefault();setSteam(e.target.value);}
  const handleDiscord = (e) => {e.preventDefault();setDiscord(e.target.value);}
  const handleOrigin = (e) => { e.preventDefault(); setOrigin(e.target.value); }
  const handleBattleNet = (e) => { e.preventDefault(); setBattleNet(e.target.value); }
  const handlePlaystation = (e) => { e.preventDefault(); setPlaystation(e.target.value); }
  const handleXbox = (e) => { e.preventDefault(); setXbox(e.target.value); }
  const handleUplay = (e) => { e.preventDefault(); setUplay(e.target.value); }
  const profileProps = {
    handleSteam: handleSteam,
    handleDiscord: handleDiscord,
    handleOrigin: handleOrigin,
    handleBattleNet: handleBattleNet,
    handlePlaystation: handlePlaystation,
    handleXbox: handleXbox,
    handleUplay: handleUplay,
    profiles: [steam, discord, uplay, battleNet, origin, playstation, xbox]
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /* GAMES */
  const currentGames = games.map(game=>{
    return(
      <li>
        <ul>
          <li>Game: {game.name}</li>
          <li>Rank: {game.ranks}</li>
          <li>Role: {game.roles}</li>
        </ul>
        <button onClick={(e)=>{e.preventDefault();deleteGame(game)}}>DELETE</button>
      </li>
    )
  })
  const deleteGame = (gameToDelete) => {
    const result = games.filter(game=>game!==gameToDelete)
    setGames(result);
  }
  const handleAddGame = (game) => {
    setGames([...games, game]);
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /* Teams */
  const currentTeams = teams.map(team => {
    return (
      <li>
        <ul>
          <li>Team: {team.name}</li>
          <li>Bio: {team.bio}</li>
        </ul>
        <button onClick={(e) => { e.preventDefault(); deleteTeam(team) }}>DELETE</button>
      </li>
    )
  })
  const deleteTeam = (teamToDelete) => {
    const result = teams.filter(team => team !== teamToDelete)
    setTeams(result);
  }
  const handleAddTeam = (team) => {
    setTeams([...teams, team]);
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /* Questions */
  const currentQuestions = questions.map(question=>{
    return(
      <div>
        {question.question}: {question.answers}
        <button onClick={(e) => { e.preventDefault(); deleteQuestion(question) }}>DELETE</button>
      </div>
    )
  })
  const deleteQuestion = (questionToDelete) => {
    const result = questions.filter(question=>question!==questionToDelete);
    setQuestions(result);
  }
  const handleAddQuestion = (question) => {
    setQuestions([...questions, question]);
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className='form'>
      <h2>Edit Profile</h2>
      <form onSubmit={handleEdit}>
      <label>
        Username
        <input type="text" value={username} onChange={handleUsername}/>
      </label>
      <label>
        First Name
        <input type="text" value={firstname} onChange={handleFirstname}/>
      </label>
      <label>
        Last Name
        <input type="text" value={lastname} onChange={handleLastname}/>
      </label>
      <label>
        Email
        <input type="email" value={email} onChange={handleEmail}/>
      </label>
      <label>
        Bio
        <textarea value={bio} onChange={handleBio}/>
      </label>
        
        <Languages {...languageProps}/>
        <Profiles {...profileProps}/>

        {currentGames}
        <Games handleAddGame={handleAddGame}/>

        {currentTeams}
        <Teams handleAddTeam={handleAddTeam}/>

        {currentQuestions}
        <Questions handleAddQuestion={handleAddQuestion}/>
        <label>
          Password
          <input type="password" value={password} onChange={handlePassword}/>
        </label>
      <button type='submit'><span>Edit</span></button>
      </form>
    </div>
  );;
}

import React, {useState, useEffect} from 'react';
import { useAuth } from '../login/Authentication';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Profiles from './edit-components/Profiles';
import Languages from './edit-components/Languages';
import Games from './edit-components/Games';
//import Teams from './edit-components/Teams';
import Questions from './edit-components/Questions';
import Nationality from './edit-components/Nationality';
import HomeVideo3 from '../../assets/videos/home3.mp4';

export default function ProfileEdit() {
  //Context Provider
  let auth = useAuth();
  //Navigation
  let navigate = useNavigate();
  //States of Profile Components
  const [username, setUsername] = useState(auth.user.username);
  const [firstname, setFirstname] = useState(auth.user.firstname);
  const [lastname, setLastname] = useState(auth.user.lastname);
  const [email, setEmail] = useState(auth.user.email);
  const [bio, setBio] = useState(auth.user.bio || '');
  const [nationality, setNationality] = useState(auth.user.nationality || '');
  const [birthdate, setBirthdate] = useState(auth.user.birthdate || '');
  const [languages, setLanguages] = useState(auth.user.languages || []);
  const [password, setPassword] = useState(auth.user.password);
  const [games, setGames] = useState(auth.user.games || []);
  //const [teams, setTeams] = useState(auth.user.teams || []);
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
  //Edit Function
  const edit = async(updatedUser) => {
    await axios.patch(`https://gameable-api.herokuapp.com/api/user/update/${auth.user.id}`, updatedUser)
  }
  //Handle Edit Function
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
        nationality: nationality,
        birthdate: birthdate,
        profiles: [
          steam,
          discord,
          uplay,
          battleNet,
          origin,
          playstation,
          xbox
        ],
        match: auth.user.match,
        teams: [],
        password: password,
        feedback: auth.user.feedback
    }
    edit(user)
    auth.setUser(user);
    navigate('/profile');
  }
  //Handle Input Changes
  const handleUsername = (e) => {e.preventDefault();setUsername(e.target.value);}
  const handleFirstname = (e) => {e.preventDefault();setFirstname(e.target.value);}
  const handleLastname = (e) => {e.preventDefault();setLastname(e.target.value);}
  const handleEmail = (e) => {e.preventDefault();setEmail(e.target.value);}
  const handleBio = (e) => { e.preventDefault(); setBio(e.target.value); }
  const handlePassword = (e) => { e.preventDefault(); setPassword(e.target.value); }
  const handleBirthdate = (e) => {e.preventDefault(); setBirthdate(e.target.value);}
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /* LANGUAGES */
  const handlePrimaryLanguage = (e) => {
    e.preventDefault();
    let languageArr = [e.target.value, languages[1] || ''];
    setLanguages(languageArr);
  }
  const handleSecondaryLanguage = (e) => {
    e.preventDefault();
    let languageArr = [...languages];
    languageArr.splice(1, 1, e.target.value);
    setLanguages(languageArr);
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /* NATIONALITY */
  const handleNationality = (e) => {
    e.preventDefault();
    const result = e.target.value;
    setNationality(result);
  }
  const nationalityProps = {
    nationality: nationality,
    handleNationality: handleNationality
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
    handleUplay: handleUplay,
    handleOrigin: handleOrigin,
    handleBattleNet: handleBattleNet,
    handlePlaystation: handlePlaystation,
    handleXbox: handleXbox,
    profiles: [steam, discord, uplay, origin, battleNet, playstation, xbox]
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /* GAMES */
  const currentGames = games.map(game=>{
    return(
        <div className='game-card'>
          <div className='title'><h3><b>{game.name}</b></h3></div>
          <p>Rank: {game.ranks}</p>
          <p>Role: {game.roles}</p>

        <button className='button' onClick={(e) => { e.preventDefault(); deleteGame(game) }}><span>DELETE</span></button>
        </div>
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
  /*const currentTeams = teams.map(team => {
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
  }*/
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /* Questions */
  const currentQuestions = questions.map(question=>{
    return(
      <div className='question'>
        {question.question}: {question.answers}
        <button onClick={(e) => { e.preventDefault(); deleteQuestion(question) }} className='button'><span>DELETE</span></button>
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
    <div className='edit'>
      <video autoPlay loop muted>
        <source src={HomeVideo3} type='video/mp4' />
      </video>
      <div className='overlay'></div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleEdit}>
      <div className='wrapper'><div className='introduction'><label>
        Username:
        <input type="text" value={username} onChange={handleUsername}/>
      </label>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmail} />
          </label>
      <label>
        First Name:
        <input type="text" value={firstname} onChange={handleFirstname}/>
      </label>
      <label>
        Last Name:
        <input type="text" value={lastname} onChange={handleLastname}/>
          </label>
        <Nationality {...nationalityProps} />
        <label>
          Birthdate:
          <input type='date' value={birthdate} onChange={handleBirthdate}/>
          </label></div></div>
        <div className='textarea'><textarea value={bio} onChange={handleBio} /></div>

        
        <Languages handlePrimaryLanguage={handlePrimaryLanguage} handleSecondaryLanguage={handleSecondaryLanguage} languages={languages} />
        <div className='wrapper-2'><Profiles {...profileProps} /></div>

        <div className='games'>{currentGames}</div>
        <Games handleAddGame={handleAddGame} games={games}/>

        {/*{currentTeams}
        <Teams handleAddTeam={handleAddTeam}/>*/}

        <div className='questions'>{currentQuestions}</div>
        <Questions handleAddQuestion={handleAddQuestion} questions={questions}/>
        <div className='ending'><label>
          Password:
          <input type="password" value={password} onChange={handlePassword}/>
        </label>
          <button type='submit' className='button'><span>Edit</span></button></div>
      </form>
    </div>
  );
}

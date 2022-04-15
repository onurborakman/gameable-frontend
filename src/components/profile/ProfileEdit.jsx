import React, {useState} from 'react';
import { apikey, useAuth } from '../login/Authentication';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Profiles from './edit-components/Profiles';
import Languages from './edit-components/Languages';
import Games from './edit-components/Games';
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
  const [questions, setQuestions] = useState(auth.user.personalities || []);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('')
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

  //Edit Function
  const edit = async(updatedUser) => {
    await axios.patch(`https://gameable-api.herokuapp.com/api/user/update/${auth.user.id}`, updatedUser, apikey)
  }
  //Function to get the list of the users
  const listOfUsers = async () => {
    const data = await axios.get('https://gameable-api.herokuapp.com/api/user/all', {}, apikey);
    const result = data.data.data;
    setUsers(result);
  }
  //Handle Edit Function
  const handleEdit = (e) => {
    e.preventDefault();
    listOfUsers();
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
    //check to see if the username or email exists
    if (users.filter(el => el.username === user.username).length === 0 && users.filter(el => el.email === user.email).length === 0) {
      //check to see if password is valid
      if (checkPassword(user.password)) {
        //update database
        edit(user)
        //update localstorage
        auth.setUser(user);
        //navigate back to profile
        navigate('/profile');
      } else {
        //display feedback
        setMessage('Password must contain at least 2 upper case characters and at least 2 special characters')
      }
    } else {
      //display feedback
      setMessage('Username or email already exists');
    }
    
    
  }
  //Handle Input Changes
  const handleUsername = (e) => {e.preventDefault();setUsername(e.target.value);}
  const handleFirstname = (e) => {e.preventDefault();setFirstname(e.target.value);}
  const handleLastname = (e) => {e.preventDefault();setLastname(e.target.value);}
  const handleEmail = (e) => {e.preventDefault();setEmail(e.target.value);}
  const handleBio = (e) => { e.preventDefault(); setBio(e.target.value); }
  const handlePassword = (e) => { e.preventDefault(); setPassword(e.target.value); }
  const handleBirthdate = (e) => {e.preventDefault(); setBirthdate(e.target.value);}
  /* LANGUAGES */
  //handle primary language change
  const handlePrimaryLanguage = (e) => {
    e.preventDefault();
    let languageArr = [e.target.value, languages[1] || ''];
    setLanguages(languageArr);
  }
  //handle secondary language change
  const handleSecondaryLanguage = (e) => {
    e.preventDefault();
    let languageArr = [...languages];
    languageArr.splice(1, 1, e.target.value);
    setLanguages(languageArr);
  }
  /* NATIONALITY */
  //handle nationality change
  const handleNationality = (e) => {
    e.preventDefault();
    const result = e.target.value;
    setNationality(result);
  }
  //nationality properties to pass to child component
  const nationalityProps = {
    nationality: nationality,
    handleNationality: handleNationality
  }
  /* PROFILES */
  //handle Steam link change
  const handleSteam = (e) => {e.preventDefault();setSteam(e.target.value);}
  //handle discord link change
  const handleDiscord = (e) => {e.preventDefault();setDiscord(e.target.value);}
  //handle origin link change
  const handleOrigin = (e) => { e.preventDefault(); setOrigin(e.target.value); }
  //handle battlenet link change
  const handleBattleNet = (e) => { e.preventDefault(); setBattleNet(e.target.value); }
  //handle playstation link change
  const handlePlaystation = (e) => { e.preventDefault(); setPlaystation(e.target.value); }
  //handle xbox link change
  const handleXbox = (e) => { e.preventDefault(); setXbox(e.target.value); }
  //handle uplay link change
  const handleUplay = (e) => { e.preventDefault(); setUplay(e.target.value); }
  //profile properties to pass to child component
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
  /* GAMES */
  //display already added games
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
  //function delete a game
  const deleteGame = (gameToDelete) => {
    //filter out the game from the array
    const result = games.filter(game=>game!==gameToDelete)
    //update the state
    setGames(result);
  }
  //handle new game addition
  const handleAddGame = (game) => {
    //update the state
    setGames([...games, game]);
  }
  /* Questions */
  //display currently added questions
  const currentQuestions = questions.map(question=>{
    return(
      <div className='question'>
        {question.question}: {question.answers}
        <button onClick={(e) => { e.preventDefault(); deleteQuestion(question) }} className='button'><span>DELETE</span></button>
      </div>
    )
  })
  //handle question deletion
  const deleteQuestion = (questionToDelete) => {
    //filter the questions by filtering out the selected question
    const result = questions.filter(question=>question!==questionToDelete);
    //update the state
    setQuestions(result);
  }
  //handle new question
  const handleAddQuestion = (question) => {
    setQuestions([...questions, question]);
  }
  //Method to check password requirements
  const checkPassword = (password) => {
    const regex = /(?=.*[A-Z].*[A-Z].*)(?=.*[!@#$%^&*].*[!@#$%^&*].*)(?=.{8,12})/;
    return regex.test(password);
  }
  //JSX
  return (
    <div className='edit'>
      <video autoPlay loop muted playsInline>
        <source src={HomeVideo3} type='video/mp4' />
      </video>
      <div className='overlay'></div>
      <h2>Edit Profile</h2>
      {message && <p className='message'>{message}</p>}
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

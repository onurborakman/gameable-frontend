import React, {useState, useEffect} from 'react';
import { useAuth } from '../login/Authentication';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LanguageList from '../../assets/data/languages.json';
import ProfilesSection from './edit-page/ProfilesSection';

export default function ProfileEdit() {
  let auth = useAuth();
  let navigate = useNavigate();

  useEffect(()=>{
    getGames();
    getRanks();
    getPositions();
  },[])

  const [gamesList, setGamesList] = useState([]);
  const [ranksList, setRanksList] = useState([]);
  const [positionsList, setPositionsList] = useState([])

  const [username, setUsername] = useState(auth.user.username);
  const [firstname, setFirstname] = useState(auth.user.firstname);
  const [lastname, setLastname] = useState(auth.user.lastname);
  const [email, setEmail] = useState(auth.user.email);
  const [bio, setBio] = useState(auth.user.bio);
  const [games, setGames] = useState('');
  const [ranks, setRanks] = useState('');
  const [roles, setRoles] = useState('');
  const [languages, setLanguages] = useState(auth.user.languages || []);
  const [personalities, setPersonalities] = useState(auth.user.personalities);
  const [teams, setTeams] = useState(auth.user.teams);
  const [password, setPassword] = useState(auth.user.password);
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
  /* GAMES SECTION */
  const getGames = async() => {
    const list = await axios.get(`https://gameable-api.herokuapp.com/api/game/all`);
    setGamesList(list.data.data);
  }
  const gameOptions = () => {
    return gamesList.map(game=>{
      return(
        <option value={game.id}>{game.name}</option>
      )
    })
  }
  const getRanks = async() => {
    const ranks = await axios.get(`https://gameable-api.herokuapp.com/api/rank/all`);
    setRanksList(ranks.data.data);
  }

  const getPositions = async() => {
    const positions = await axios.get(`https://gameable-api.herokuapp.com/api/role/all`);
    setPositionsList(positions.data.data)
  }
  const rankOptions = () => {
    const list = []
    ranksList.forEach(ranking=>{
      gamesList.forEach(game=>{
        game.ranks.forEach(rank=>{
          if(rank === ranking.id){
            list.push(ranking);
          }
        })
      })
    })
    return list.map(ranking => {
      return(
        <option value={ranking.id}>{ranking.name}</option>
      )
    })
  }

  const positionOptions = () => {
    const list = []
    gamesList.forEach(game=>{
      game.roles.forEach(role=>{
        positionsList.forEach(position=>{
          if(role === position.id){
            list.push(position);
          }
        })
      })
    })
    return list.map(role => {
      return (
        <option value={role.id}>{role.name}</option>
      )
    })
  }

  const handleGames = (e) => { e.preventDefault(); setGames(e.target.value); }
  const handleRank = (e) => {e.preventDefault();setRanks(e.target.value)}
  const handlePosition = (e) => {e.preventDefault();setRoles(e.target.value)}
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
        games: [games, ranks, roles],
        languages: languages,
        personalities: personalities,
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
  const handleBio = (e) => {e.preventDefault();setBio(e.target.value);}
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /* LANGUAGES */
  const handlePrimaryLanguage = (e) => {
    e.preventDefault();
    const languageArr = [e.target.value, languages[1] || null];
    setLanguages(languageArr);
  }
  const handleSecondayLanguage = (e) => {
    e.preventDefault();
    const languageArr = [languages[0] || null, e.target.value];
    setLanguages(languageArr);
  }
  const getLanguageList = () => {
    return LanguageList.map(language=>{
      return(
        <option value={language.name}>{language.name}</option>
      )
    })
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handlePersonalities = (e) => {e.preventDefault();setPersonalities(e.target.value);}
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /* PROFILES */
  const handleSteam = (e) => {e.preventDefault();setSteam(e.target.value);}
  const handleDiscord = (e) => {e.preventDefault();setDiscord(e.target.value);}
  const handleOrigin = (e) => { e.preventDefault(); setOrigin(e.target.value); }
  const handleBattleNet = (e) => { e.preventDefault(); setBattleNet(e.target.value); }
  const handlePlaystation = (e) => { e.preventDefault(); setPlaystation(e.target.value); }
  const handleXbox = (e) => { e.preventDefault(); setXbox(e.target.value); }
  const handleUplay = (e) => { e.preventDefault(); setUplay(e.target.value); }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleTeams = (e) => {e.preventDefault();setTeams(e.target.value);}
  const handlePassword = (e) => {e.preventDefault();setPassword(e.target.value);}

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
      <label>
        You are looking to play:
        <select onChange={handleGames}>
          <option value={''}>Please select a game</option>
          {gameOptions()}
        </select>
        {games !== '' && 
          <select onChange={handleRank}>
              <option value={''}>Please select your ranking</option>
            {rankOptions()}
          </select>
        }
        {ranks !== '' &&
          <select onChange={handlePosition}>
              <option value={''}>Please select the position you would like to play</option>
            {positionOptions()}
          </select>
        }
      </label>
        {/* LANGUAGE SECTION */}
      <label>
        Primary Language
        <select onChange={handlePrimaryLanguage}>
          <option value={languages[0] || ''}>{languages[0] || 'Please select a primary language'}</option>
          {getLanguageList()}
        </select>
      </label>

        <label>
          Secondary Language
          <select onChange={handleSecondayLanguage} >
            <option value={languages[1] || null}>{languages[1] || 'Please select a secondary language'}</option>
            {getLanguageList()}
          </select>
        </label>
        {/* LANGUAGE SECTION ENDS */}
      <label>
        Personalities
        <input type="text" value={personalities} onChange={handlePersonalities}/>
      </label>
        {/* Steam URL */}
        <label>
          Steam URL:
          <input type="text" value={steam} onChange={handleSteam} />
        </label>
        {/* Discord URL */}
        <label>
          Discord URL:
          <input type="text" value={discord} onChange={handleDiscord} />
        </label>
        {/* UPlay URL */}
        <label>
          UPlay URL:
          <input type="text" value={uplay} onChange={handleUplay} />
        </label>
        {/* Origin URL */}
        <label>
          Origin URL:
          <input type="text" value={origin} onChange={handleOrigin} />
        </label>
        {/* Battle.net URL */}
        <label>
          Battle.net URL:
          <input type="text" value={battleNet} onChange={handleBattleNet} />
        </label>
        {/* Playstation Network URL */}
        <label>
          Playstation Network URL:
          <input type="text" value={playstation} onChange={handlePlaystation} />
        </label>
        {/* Xbox Live URL */}
        <label>
          XBOX Live URL:
          <input type="text" value={xbox} onChange={handleXbox} />
        </label>
      <label>
        Teams
        <input type="text" value={teams} onChange={handleTeams}/>
      </label>
      <label>
        Password
        <input type="password" value={password} onChange={handlePassword}/>
      </label>
      <button type='submit'><span>Edit</span></button>
      </form>
    </div>
  );;
}

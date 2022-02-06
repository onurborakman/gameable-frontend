import React, {useState} from 'react';
import { useAuth } from '../components/login/Authentication';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ProfileEdit() {
    let auth = useAuth();
    let navigate = useNavigate();
  const [username, setUsername] = useState(auth.user.username);
  const [firstname, setFirstname] = useState(auth.user.firstname);
  const [lastname, setLastname] = useState(auth.user.lastname);
  const [email, setEmail] = useState(auth.user.email);
  const [bio, setBio] = useState(auth.user.bio);
  const [games, setGames] = useState(auth.user.games);
  const [languages, setLanguages] = useState(auth.user.languages);
  const [personalities, setPersonalities] = useState(auth.user.personalities);
  const [profiles, setProfiles] = useState(auth.user.profiles);
  const [teams, setTeams] = useState(auth.user.teams);
  const [password, setPassword] = useState(auth.user.password);

  const edit = async(updatedUser, callback) => {
    axios.patch(`https://gameable-api.herokuapp.com/api/user/update/${auth.user.id}`, updatedUser)
        .then(response => {
            callback(response);
        })
  }

  const handleEdit = async(e) => {
    e.preventDefault();
    let user = {
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
        bio: bio,
        games: games,
        languages: languages,
        personalities: personalities,
        profiles: profiles,
        teams: teams,
        password: password
    }
    edit(user, (response=>{
        console.log(response)
        let update = {
            id: auth.user.id,
            username: username,
            firstname: firstname,
            lastname: lastname,
            email: email,
            bio: bio,
            games: games,
            languages: languages,
            personalities: personalities,
            profiles: profiles,
            teams: teams,
            password: password
        }
        auth.setUser(update)
        localStorage.setItem('user', JSON.stringify(update));
    }));
  }

  const handleUsername = (e) => {e.preventDefault();setUsername(e.target.value);}
  const handleFirstname = (e) => {e.preventDefault();setFirstname(e.target.value);}
  const handleLastname = (e) => {e.preventDefault();setLastname(e.target.value);}
  const handleEmail = (e) => {e.preventDefault();setEmail(e.target.value);}
  const handleBio = (e) => {e.preventDefault();setBio(e.target.value);}
  const handleGames = (e) => {e.preventDefault();setGames(e.target.value);}
  const handleLanguages = (e) => {e.preventDefault();setLanguages(e.target.value);}
  const handlePersonalities = (e) => {e.preventDefault();setPersonalities(e.target.value);}
  const handleProfiles = (e) => {e.preventDefault();setProfiles(e.target.value);}
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
        <input type="text" value={bio} onChange={handleBio}/>
      </label>
      <label>
        Games
        <input type="text" value={games} onChange={handleGames}/>
      </label>
      <label>
        Languages
        <input type="text" value={languages} onChange={handleLanguages}/>
      </label>
      <label>
        Personalities
        <input type="text" value={personalities} onChange={handlePersonalities}/>
      </label>
      <label>
        Profiles
        <input type="text" value={profiles} onChange={handleProfiles}/>
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

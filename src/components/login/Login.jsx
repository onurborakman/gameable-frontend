import React, {useState} from 'react';
import { useAuth } from './Authentication';
import BackgroundVideo from '../../assets/videos/home.mp4';

export default function Login() {
//states
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState('');
//authenticated user
  let auth = useAuth();
//log the user
  const handleLogin = (e) => {
    e.preventDefault();
    //get user input
    let user = {
      username: username,
      password: password
    }
    //log the user
    auth.login(user, (newUser)=>{
      setMessage(newUser);
    })
  }
//function to keep state up to date with user input
  const handleUsername = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  }
//function to keep state up to date with user input
  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  }
//jsx
  return (
    <div className='login-register'>
      <div className='title-box'><a href='/'>GAMEABLE</a></div>
      {message && <p className='message'>{message}</p>}
      <div className='form'>
        <video autoPlay loop muted>
          <source src={BackgroundVideo} type='video/mp4' />
        </video>
        <div className='overlay'></div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>
            Username
            <input type="text" onChange={handleUsername} required/>
          </label>
          <label>
            Password
            <input type="password" onChange={handlePassword} required/>
          </label>
          <button type='submit' className='button'><span>Login</span></button>
        </form>
        <a href="/registration">Not registered? Sign up now.</a>
      </div>
      <div className='footer-class'><p>Copyright © 2022 Gameable</p></div>
    </div>
  );
}

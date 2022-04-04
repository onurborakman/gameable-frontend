import React, {useState} from 'react';
import { useAuth } from './Authentication';
import BackgroundVideo from '../../assets/videos/home.mp4';

export default function Login() {

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState('');

  let auth = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    let user = {
      username: username,
      password: password
    }
    auth.login(user, (newUser)=>{
      setMessage(newUser);
    })
  }

  const handleUsername = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  }

  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  }

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

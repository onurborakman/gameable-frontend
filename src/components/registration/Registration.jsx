import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import BackgroundVideo from '../../assets/videos/home.mp4';

export default function Registration() {

  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  let navigate = useNavigate();


  const register = async (newUser) => {
    await axios.put('https://gameable-api.herokuapp.com/api/user/create', newUser)
  }

  const handleRegistration = (e) => {
    e.preventDefault();
    let user = {
      username: username,
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password
    }
    register(user)
    navigate('/login');
    
  }

  const handleUsername = (e) => {e.preventDefault();setUsername(e.target.value);}
  const handleFirstname = (e) => {e.preventDefault();setFirstname(e.target.value);}
  const handleLastname = (e) => {e.preventDefault();setLastname(e.target.value);}
  const handleEmail = (e) => {e.preventDefault();setEmail(e.target.value);}
  const handlePassword = (e) => {e.preventDefault();setPassword(e.target.value);}

  return (
    <div className='login-register'>
      <div className='title-box'><a href='/'>GAMEABLE</a></div>
    <div className='form'>
        <video autoPlay loop muted>
          <source src={BackgroundVideo} type='video/mp4' />
        </video>
        <div className='overlay'></div>
      <h2>Registration</h2>
      <form onSubmit={handleRegistration}>
      <label>
        Username
        <input type="text" onChange={handleUsername} required/>
      </label>
      <label>
        First Name
        <input type="text" onChange={handleFirstname} required/>
      </label>
      <label>
        Last Name
        <input type="text" onChange={handleLastname} required/>
      </label>
      <label>
        Email
        <input type="email" onChange={handleEmail} required/>
      </label>
      <label>
        Password
        <input type="password" onChange={handlePassword} required/>
      </label>
      <button type='submit' className='button'><span>Register</span></button>
      </form>
      <a href='/login'>Already have an account? Sign in.</a>
    </div>
    </div>
  );
}

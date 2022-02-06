import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function Registration() {

  const [username, setUsername] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  
  let navigate = useNavigate();


  const register = (newUser, callback) => {
    axios.put('https://gameable-api.herokuapp.com/api/user/create', newUser)
      .then(response=>{
        callback(response)
      })
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
    register(user, response=>{
      console.log(response);
      navigate('/login');
    })
    
  }

  const handleUsername = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  }

  const handleFirstname = (e) => {
    e.preventDefault();
    setFirstname(e.target.value);
  }

  const handleLastname = (e) => {
    e.preventDefault();
    setLastname(e.target.value);
  }

  const handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  }

  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  }

  return (
    <div className='form'>
      <h2>Registration</h2>
      <form onSubmit={handleRegistration}>
      <label>
        Username
        <input type="text" onChange={handleUsername}/>
      </label>
      <label>
        First Name
        <input type="text" onChange={handleFirstname}/>
      </label>
      <label>
        Last Name
        <input type="text" onChange={handleLastname}/>
      </label>
      <label>
        Email
        <input type="email" onChange={handleEmail}/>
      </label>
      <label>
        Password
        <input type="password" onChange={handlePassword}/>
      </label>
      <button type='submit'><span>Register</span></button>
      </form>
    </div>
  );
}

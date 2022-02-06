import React, {useState} from 'react';
import { useAuth } from './Authentication';

export default function Login() {

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  let auth = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    let user = {
      username: username,
      password: password
    }
    auth.login(user, (newUser)=>{
      console.log(newUser)
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
  <div className='form'>
    <h2>Login</h2>
    <form onSubmit={handleLogin}>
      <label>
        Username
        <input type="text" onChange={handleUsername}/>
      </label>
      <label>
        Password
        <input type="password" onChange={handlePassword}/>
      </label>
      <button type='submit'><span>Login</span></button>
    </form>
  </div>
  );
}

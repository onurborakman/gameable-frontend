import React, {useState, useEffect} from 'react';
import { useLocation, Navigate, Outlet, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const AuthContext = React.createContext();

export default function Authentication(props) {
  const [user, setUser] = useState(()=>{
    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user);
    return parsedUser || "";
  });

  useEffect(()=>{
    localStorage.setItem('user', JSON.stringify(user))
  },[user])

  const login = async (newUser, callback) => {
      await axios.get('https://gameable-api.herokuapp.com/api/user/all')
        .then(response=>{
          if(response.data.responseCode === 200){
            response.data.data.forEach(user=>{
              if(user.username === newUser.username && user.password === newUser.password){
                setUser(user);
                callback(user); 
              }
            })
          }
        })
  }

  const logout = (callback) => {
      localStorage.removeItem('user');
      setUser(null);
      callback();
  }

  let value = {user, setUser, login, logout};

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
}

export function useAuth(){
  return React.useContext(AuthContext);
}

export function RequireAuth(){
  let auth = useAuth();
  let location = useLocation();

  if(!auth.user){
    return <Navigate to="/login" state={{from: location}}/>;
  }

  return <Outlet/>
}

export function NoAuth(){
  let auth = useAuth();
  let location = useLocation();

  if(auth.user){
    return <Navigate to="/" state={{from: location}}/>;
  }

  return <Outlet/>;
}

export function AuthNavbar(){
  let auth = useAuth();
  let navigate = useNavigate();

  if(!auth.user){
    return (
      <div>
        <nav>
          <ul className='nav-ul'>
            <div className='main'>
              <div className='logo'>
                <li className='nav-li'>
                  <Link to='/'>GAMEABLE</Link>
                </li>
              </div>
              <div className='menu'>
                <li className='nav-li'>
                  <Link to="/">Home</Link>
                </li>
              </div>
              <div className='right-menu'>
                <li className='nav-li'>
                  <Link to="/login">Login</Link>
                </li>
                <li className='nav-li'>
                  <Link to="/registration">Register</Link>
                </li>
              </div>
            </div>
          </ul>
        </nav>
      </div>
    )
  }

  return(
    <div>
      <nav>
        <ul className='nav-ul'>
          <div className='main'>
          <div className='logo'>
            <li className='nav-li'>
               <Link to='/'>GAMEABLE</Link>
            </li>
          </div>
          <div className='menu'>
            <li className='nav-li'>
              <Link to="/protected">Protected</Link>
            </li>
          </div>
          <div className='right-menu'>
            <li className='nav-li'>
              <Link to="/profile">{auth.user.username}</Link>
            </li>
              <button
                onClick={()=>auth.logout(()=>navigate("/"))}
               className='button logout-button'><span>Log out</span></button>
          </div>
          </div>
      </ul>
      </nav>
    </div>
  )
}

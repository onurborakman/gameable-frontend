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
      await axios.get('https://gameable-api.herokuapp.com/api/user/all', {}, apikey)
        .then(response=>{
          if(response.data.responseCode === 200){
            response.data.data.forEach(user=>{
              if(user.username === newUser.username && user.password === newUser.password){
                setUser(user);
                callback(""); 
              }else{
                callback('Username or password does not match our records. Please try again')
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
    return <Navigate replace to="/login" state={{from: location}}/>;
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

export function RequireMatch(){
  let auth = useAuth();
  let location = useLocation();

  if(auth.user.match === null){
    return <Navigate to='/match' state={{from: location}}/>;
  }

  return <Outlet/>;
}

export const apikey = {
  "Api-Key": 'eba55d5a-8589-4c04-a935-b28f05736924'
};

export function AuthNavbar(){
  let auth = useAuth();
  let navigate = useNavigate();

  return(
    <div className="navbar">
      <nav>
        <div className='title-box'><a href='/' className='title'>GAMEABLE</a><a href='/match' className='item'>MATCH UP!</a></div>
          <div className='top-right-menu'>
            <div className='profile'>
              <Link to="/profile">{auth.user.username}</Link>
            </div>
            <div className='logout'><button
              onClick={()=>auth.logout(()=>navigate("/"))} className='button'>
            <span>Log out</span></button></div>
          </div>
      </nav>
    </div>
  )
}

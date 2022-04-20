import React, {useState, useEffect} from 'react';
import { useLocation, Navigate, Outlet, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
//React context
const AuthContext = React.createContext();

export default function Authentication(props) {
  //get the user from localstorage if not leave it empty
  const [user, setUser] = useState(()=>{
    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user);
    return parsedUser || "";
  });
//set the localstorage user
  useEffect(()=>{
    localStorage.setItem('user', JSON.stringify(user))
  },[user])
//method to log the user in
  const login = async (newUser, callback) => {
    //wait for axios get request
      await axios.get('https://gameable-api.herokuapp.com/api/user/all', apikey)
        .then(response=>{
          if(response.data.responseCode === 200){
            response.data.data.forEach(user=>{
              //check username and password
              if(user.username === newUser.username && user.password === newUser.password){
                //start the session
                setUser(user);
                callback(""); 
              }else{
                //feedback message
                callback('Username or password does not match our records. Please try again')
              }
            })
          }
        })
  }
  //function to end the session
  const logout = (callback) => {
    //remove the user from the localstorage
      localStorage.removeItem('user');
      setUser(null);
      callback();
  }

  let value = {user, setUser, login, logout};

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
}
//authenticated user context
export function useAuth(){
  return React.useContext(AuthContext);
}
//function that makes the routes authentication-required
export function RequireAuth(){
  let auth = useAuth();
  let location = useLocation();

  if(!auth.user){
    return <Navigate replace to="/login" state={{from: location}}/>;
  }

  return <Outlet/>
}
//function that makes the routes no authentication required
export function NoAuth(){
  let auth = useAuth();
  let location = useLocation();

  if(auth.user){
    return <Navigate to="/" state={{from: location}}/>;
  }

  return <Outlet/>;
}
//function to make the route matchup property required
export function RequireMatch(){
  let auth = useAuth();
  let location = useLocation();

  if(auth.user.match === null){
    return <Navigate to='/match' state={{from: location}}/>;
  }

  return <Outlet/>;
}
//header
export const apikey = {
  "headers": {
    "X-Api-Key": "eba55d5a-8589-4c04-a935-b28f05736924"
  }
};
//navbar with session activated
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

import {Routes, Route} from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Login from './components/login/Login';
import NoMatch from './components/nomatch/NoMatch';
import Authentication, { RequireAuth, NoAuth } from './components/login/Authentication';
import Protected from './components/Protected';
import Registration from './components/registration/Registration';
import Profile from './profile/Profile';
import ProfileEdit from './profile/ProfileEdit';

import './App.css';

function App() {
  return (
    <Authentication>
      <Routes>
        <Route path="/" element={<Navbar/>}>

          <Route index element={<Home/>}/>

          <Route element={<NoAuth/>}>
            <Route path="/login" element={<Login/>}/>
            <Route path="/registration" element={<Registration/>}/>
          </Route>

          <Route element={<RequireAuth/>}>
            <Route path="/protected" element={<Protected/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/profile/edit" element={<ProfileEdit/>}/>
          </Route>

          <Route path="*" element={<NoMatch/>}/>

        </Route>
      </Routes>
    </Authentication>
  );
}

export default App;

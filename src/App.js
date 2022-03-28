import {Routes, Route} from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Login from './components/login/Login';
import NoMatch from './components/nomatch/NoMatch';
import Authentication, { RequireAuth, NoAuth, RequireMatch } from './components/login/Authentication';
import Match from './components/match/Match';
import Up from './components/match/Up';
import Registration from './components/registration/Registration';
import Profile from './components/profile/Profile';
import ProfileEdit from './components/profile/ProfileEdit';
import Admin from './components/admin/Admin';

import './App.scss';

function App() {
  return (
    <Authentication>
      <Routes>
        <Route index element={<Home />} />
        
          <Route element={<NoAuth/>}>
            <Route path="/login" element={<Login/>}/>
            <Route path="/registration" element={<Registration/>}/>
          </Route>
        <Route path="/" element={<Navbar />}>
          <Route element={<RequireAuth/>}>
            <Route path="/match" element={<Match/>}/>
            <Route element={<RequireMatch/>}>
              <Route path="/match/up" element={<Up />} />
            </Route>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/profile/edit" element={<ProfileEdit/>}/>
            <Route path='/admin' element={<Admin/>}/>
          </Route>

          <Route path="*" element={<NoMatch/>}/>

        </Route>
      </Routes>
    </Authentication>
  );
}

export default App;

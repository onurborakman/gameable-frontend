import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../login/Authentication';
import TeamCard from './profile-components/TeamCard';
import GameCard from './profile-components/GameCard';
import ProfileCard from './profile-components/ProfileCard';
import PersonalityCard from './profile-components/PersonalityCard';
import Languages from './profile-components/Languages';

export default function Profile() {
  let auth = useAuth();
  let navigate = useNavigate();
  
  const handleEdit = (e) => {
    e.preventDefault();
    navigate('/profile/edit');
  }

  return (
    <div className='flex-column'>
      <div className='profile-page'>
          <h2>@{auth.user.username}</h2>
          <div>
            <div><h3>{auth.user.firstname} {auth.user.lastname}</h3></div>
            <textarea disabled placeholder='Bio'>{auth.user.bio}</textarea>
            <p>Email: {auth.user.email}</p>
            <p>{<Languages languages={auth.user.languages || []}/>}</p>
            <div className='profiles'>{auth.user.profiles && auth.user.profiles.map((profile, index)=>{
              return(
                <ProfileCard profile={profile} index={index}/>
              )
            })}
            </div>
            <div>
              {auth.user.games && auth.user.games.map((game)=>{
                return(
                  <GameCard game={game}/>
                )
              })}
            </div>
            <div>
              {auth.user.teams && auth.user.teams.map((team)=>{
                return(
                  <TeamCard team={team}/>
                )
              })}
            </div>
            <div className='flex-row'><button type="button" onClick={handleEdit} className='button form-button'><span>EDIT</span></button></div>
          </div>
      </div>
    </div>
  );
}

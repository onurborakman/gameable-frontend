import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../login/Authentication';
import TeamCard from './TeamCard';
import GameCard from './GameCard';
import ProfileCard from './ProfileCard';
import PersonalityCard from './PersonalityCard';

export default function Profile() {
  let auth = useAuth();
  let navigate = useNavigate();
  
  const handleEdit = (e) => {
    e.preventDefault();
    navigate('/profile/edit');
  }

  return (
      <div>
          <h2>Profile</h2>
          <div>
            <h3>{auth.user.firstname} {auth.user.lastname}</h3>
            <h4>@{auth.user.username}</h4>
            <textarea disabled placeholder='Bio'>{auth.user.bio}</textarea>
            <p>Email: {auth.user.email}</p>
            <p>Languages: {auth.user.languages || 'NONE'}</p>
            <p>Teams: {auth.user.teams && auth.user.teams.map(team=>{
              return(
                <TeamCard team={team}/>
              )
            })}</p>
            <p>Games: {auth.user.games && auth.user.games.map(game=>{
              return(
                <GameCard game={game}/>
              )
            })}</p>
            <p>Profiles: {auth.user.profiles && auth.user.profiles.map((profile, index)=>{
              return(
                <ProfileCard profile={profile} index={index}/>
              )
            })}</p>
            <p>Personalities: {auth.user.personalities && auth.user.personalities.map(personality=>{
              return(
                <PersonalityCard personality={personality}/>
              )
            })}</p>
            <button type="button" onClick={handleEdit}>EDIT</button>
          </div>
      </div>
  );
}

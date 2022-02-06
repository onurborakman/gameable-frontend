import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/login/Authentication';

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
            <p>Bio: {auth.user.bio || ''}</p>
            <p>Email: {auth.user.email}</p>
            <p>Languages: {auth.user.languages || 'NONE'}</p>
            <p>Teams: {auth.user.teams || 'NONE'}</p>
            <p>Games: {auth.user.games || 'NONE'}</p>
            <p>Profiles: {auth.user.profiles || 'NONE'}</p>
            <p>Personalities: {auth.user.personalities || 'NONE'}</p>
            <button type="button" onClick={handleEdit}>EDIT</button>
          </div>
      </div>
  );
}

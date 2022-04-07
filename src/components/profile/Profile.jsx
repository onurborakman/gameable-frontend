import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../login/Authentication';
import GameCard from './profile-components/GameCard';
import ProfileCard from './profile-components/ProfileCard';
import PersonalityCard from './profile-components/PersonalityCard';
import Languages from './profile-components/Languages';
import HomeVideo3 from '../../assets/videos/home3.mp4';

export default function Profile() {
  //Context Provider
  let auth = useAuth();
  //Navigation
  let navigate = useNavigate();
  //Calculate Age
  const getAge = () => {
    if(auth.user.birthdate){
      const today = new Date();
      const birthdate = new Date(auth.user.birthdate);
      let age = today.getFullYear() - birthdate.getFullYear();
      const ageMonth = today.getMonth() - birthdate.getMonth();
      if(ageMonth < 0 || (ageMonth === 0 && today.getDate() < birthdate.getDate())){
        age--;
      }
      return `${age} years old`;
    }else{
      return '';
    }
  }
  //Check for empty links in profiles
  const checkProfiles = () => {
    if(auth.user.profiles){
      let count = 0;
      auth.user.profiles.forEach(profile => {
        if(profile === ''){count++}
      })
      if(count === auth.user.profiles.length){
        return false;
      }else{
        return true;
      }
    }else{
      return false;
    }
  }
  //Listen Edit Button
  const handleEdit = (e) => {
    e.preventDefault();
    navigate('/profile/edit');
  }

  return (
    <div className='profile'>
      <video autoPlay loop muted playsInline>
        <source src={HomeVideo3} type='video/mp4' />
      </video>
      <div className='overlay'></div>
      <div className='profile-box'>
        <div className='name-box'>
          <h2>{auth.user.username} AKA {auth.user.firstname} {auth.user.lastname}</h2>
            <p>{getAge()} {auth.user.nationality}</p>
      </div>
      {auth.user.bio && <div className='textarea'>
          <textarea disabled placeholder='Bio'>{auth.user.bio}</textarea></div>}
        <div className='games'>
          {auth.user.games && auth.user.games.map((game) => {
            return (
              <GameCard game={game} key={game}/>
            )
          })}
        </div>
        
        
        <div className='profiles-container'>
            {checkProfiles() && <div className='profiles'>{auth.user.profiles.map((profile, index)=>{
              return(
                <ProfileCard profile={profile} index={index} key={profile}/>
              )
            })}
            </div>}
        </div>
        
            
        <div className='profile-box-3'>
            <div>
              {auth.user.personalities && auth.user.personalities.map(personality=>{
                return(
                  <PersonalityCard personality={personality} key={personality}/>
                )
              })}
            </div>
          <div className='profile-box-2'>
            <p>Email: {auth.user.email}</p>
            {<Languages languages={auth.user.languages || []} />}
          </div>
            <div><button type="button" onClick={handleEdit} className='button'><span>EDIT</span></button></div>
          </div>
      </div>
    </div>
  );
}

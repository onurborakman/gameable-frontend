import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../login/Authentication';
import HomeVideo from '../../assets/videos/home.mp4';
import HomeVideo3 from '../../assets/videos/home3.mp4';

export default function Home() {
  let auth = useAuth();
  let navigate = useNavigate();

  if(!auth.user){
    return(
      <div className='home'>
        <div className='title-box'><h1>GAMEABLE</h1></div>
        <video autoPlay loop muted playsInline>
          <source src={HomeVideo} type='video/mp4'/>
        </video>
        <div className='overlay'></div>
        <div className='home-button-box'><div className='home-button'><span onClick={() => navigate('/login')}>GET STARTED</span></div></div>
      </div>
    )
  }else{
    return(
      <div className='home'>
        <div className='title-box'><h1>GAMEABLE</h1></div>
        <video autoPlay loop muted playsInline>
          <source src={HomeVideo3} type='video/mp4' />
        </video>
        <div className='overlay'></div>
        <div className='home-button-box'><div className='home-button'><span onClick={() => navigate('/match')}>LET'S GO</span></div></div>
      </div>
    )
  }
}

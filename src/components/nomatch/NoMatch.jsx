import React from 'react';
import HomeVideo3 from '../../assets/videos/home3.mp4';

export default function NoMatch() {
  return <div className='no-matches'>
    <video autoPlay loop muted playsInline>
      <source src={HomeVideo3} type='video/mp4' />
    </video>
    <div className='overlay'></div>
    <div className='content'>
      <h3>No Matches!</h3>
      <a href='/'>Click here to go home</a>
    </div>
  </div>;
}

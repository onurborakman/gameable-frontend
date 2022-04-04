import React from 'react'
import Steam from '../../../assets/steam.png'
import Discord from '../../../assets/discord.png';
import Battlenet from '../../../assets/battlenet.png';
import Origin from '../../../assets/origin.png';
import Uplay from '../../../assets/uplay.png';
import Playstation from '../../../assets/psn.png';
import Xbox from '../../../assets/xbox.png';

export default function ProfileCard(props) {
  return (
    <div>
      {props.index === 0 && props.profile !== '' && <><a href={props.profile}><img src={Steam} alt="Steam" width='50px' height='50px'/></a></>}
      {props.index === 1 && props.profile !== '' && <><a href={props.profile}><img src={Discord} alt="Discord" width='75px' height='50px' /></a></>}
      {props.index === 2 && props.profile !== '' && <><a href={props.profile}><img src={Uplay} alt="Uplay" width='50px' height='50px' /></a></>}
      {props.index === 3 && props.profile !== '' && <><a href={props.profile}><img src={Battlenet} alt="Battlenet" width='50px' height='50px' /></a></>}
      {props.index === 4 && props.profile !== '' && <><a href={props.profile}><img src={Origin} alt="Origin" width='50px' height='50px' /></a></>}
      {props.index === 5 && props.profile !== '' && <><a href={props.profile}><img src={Playstation} alt="Playstation" width='50px' height='50px' /></a></>}
      {props.index === 6 && props.profile !== '' && <><a href={props.profile}><img src={Xbox} alt="Xbox" width='50px' height='50px' /></a></>}
    </div>
  )
}

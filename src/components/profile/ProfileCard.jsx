import React from 'react'
import Steam from '../../assets/steam.png'

export default function ProfileCard(props) {
  return (
    <div>
          {props.index === 0 && <><a href={props.profile}><img src={Steam} alt="Steam" width='50px' height='25px'/></a></>}
    </div>
  )
}

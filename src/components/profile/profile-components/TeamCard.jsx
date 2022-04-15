import React from 'react'

export default function TeamCard(props) {
  const {team} = props;
  //JSX
  return (
    <div>
      {team.name}
      <ul>
        <li>Bio: {team.bio}</li>
      </ul>
    </div>
  )
}

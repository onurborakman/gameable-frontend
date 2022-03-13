import React from 'react'

export default function PersonalityCard(props) {
  const {personality} = props;
  return (
    <div>
      <p>{personality.question} {personality.answers[0]}</p>
    </div>
  )
}

import React from 'react'

const Languages = (props) => {
  return (
    <>
        <p>Primary Language: {props.languages[0] || 'NONE'}</p>
        <p>Secondary Language: {props.languages[1] || 'NONE'}</p>
    </>
  )
}

export default Languages
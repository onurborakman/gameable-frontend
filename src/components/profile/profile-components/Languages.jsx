import React from 'react'

const Languages = (props) => {
  return (
    <>
        <p>Primary Language: {props.languages[0] || 'Not Specified'}</p>
        <p>Secondary Language: {props.languages[1] || 'Not Specified'}</p>
    </>
  )
}

export default Languages
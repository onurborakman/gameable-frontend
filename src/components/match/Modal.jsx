import React from 'react'

const Modal = (props) => {
    //props
    const {setOpenModal, selectedUserBio} = props;
    //jsx
  return (
      <div className='modal-background'><div className='modal-box'>
          <div className='title-button'><button onClick={() => setOpenModal(false)}>X</button></div>
          <div className='title'><h1>Bio</h1></div>
          <div className='body-container'><div className='body'>
              {selectedUserBio.trim() !== '' ? selectedUserBio : "No information provided"}
              </div></div>
          <div className='footer'></div>
      </div></div>
  )
}

export default Modal
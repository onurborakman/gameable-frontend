import axios from 'axios';
import React from 'react'

const Modal = (props) => {
    const {setModal, selectedUser} = props;
    const handleUsernameChange = (e) => {e.preventDefault();selectedUser.username = e.target.value;}
    const handleFirstnameChange = (e) => {e.preventDefault();selectedUser.firstname = e.target.value;}
    const handleLastnameChange = (e) => {e.preventDefault();selectedUser.lastname = e.target.value;}
    const handleEmailChange = (e) => {e.preventDefault();selectedUser.email = e.target.value;}
    const handlePasswordChange = (e) => {e.preventDefault();selectedUser.password = e.target.value;}
    const saveChanges = async(e) => {
        e.preventDefault();
        await axios.patch(`https://gameable-api.herokuapp.com/api/user/update/${selectedUser.id}`, selectedUser);
        setModal(false)
    }
  return (
    <div className='modal-background'><div className='modal-box'>
      <div className='title-button'><button onClick={() => setModal(false)}>X</button></div>
      <div className='title'><h1>Edit {selectedUser.username}</h1></div>
        <div className='body-container'><div className='body'><label>
          Username:    
          <input type='text' value={selectedUser.username} placeholder='Username' onChange={handleUsernameChange}/>
        </label>

          <label>
              Firstname:
              <input type='text' value={selectedUser.firstname} placeholder='Firstname' onChange={handleFirstnameChange} />
          </label>

          <label>
              Lastname:
              <input type='text' value={selectedUser.lastname} placeholder='Lastname' onChange={handleLastnameChange} />
          </label>

          <label>
              Email:
              <input type='text' value={selectedUser.email} placeholder='Email' onChange={handleEmailChange} />
          </label>

          <label>
              Password:
              <input type='text' value={selectedUser.password} placeholder='Password' onChange={handlePasswordChange} />
        </label></div></div>
      <div className='footer'><button onClick={saveChanges} className='button'><span>Save Changes</span></button></div>
    </div></div>
  )
}

export default Modal
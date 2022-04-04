import axios from 'axios';
import React, {useState, useEffect} from 'react'

const Modal = (props) => {
    const {setModal, selectedUser} = props;
    const [username, setUsername] = useState(selectedUser.username);
    const [firstname, setFirstname] = useState(selectedUser.firstname);
    const [lastname, setLastname] = useState(selectedUser.lastname);
    const [email, setEmail] = useState(selectedUser.email);
    const [password, setPassword] = useState(selectedUser.password);

    const handleUsernameChange = (e) => {e.preventDefault();setUsername(e.target.value)}
    const handleFirstnameChange = (e) => {e.preventDefault();setFirstname(e.target.value)}
    const handleLastnameChange = (e) => {e.preventDefault();setLastname(e.target.value)}
    const handleEmailChange = (e) => {e.preventDefault();setEmail(e.target.value)}
    const handlePasswordChange = (e) => {e.preventDefault();setPassword(e.target.value)}

    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    useEffect(() => {
      listOfUsers();
    }, []);
    const saveChanges = async(e) => {
        e.preventDefault();
        
        selectedUser.username = username;
        selectedUser.firstname = firstname;
        selectedUser.lastname = lastname;
        selectedUser.email = email;
        selectedUser.password = password;

        if(users.filter(el => el.username === selectedUser.username).length === 0 && users.filter(el => el.email === selectedUser.email).length === 0){
          await axios.patch(`https://gameable-api.herokuapp.com/api/user/update/${selectedUser.id}`, selectedUser);
          setModal(false)
        }else{
          setMessage('Username or Email already exists in the system.');
        }
    }
  const listOfUsers = async () => {
    const data = await axios.get('https://gameable-api.herokuapp.com/api/user/all');
    const result = data.data.data;
    setUsers(result.filter(el => el.username !== selectedUser.username));
  }
  return (
    <div className='modal-background'><div className='modal-box'>
      <div className='title-button'><button onClick={() => setModal(false)}>X</button></div>
      <div className='title'><h1>Edit {selectedUser.username}</h1></div>

      {message && <p className='message'>{message}</p>}
        <div className='body-container'><div className='body'><label>
          Username:    
          <input type='text' value={username} placeholder='Username' onChange={handleUsernameChange}/>
        </label>

          <label>
              Firstname:
              <input type='text' value={firstname} placeholder='Firstname' onChange={handleFirstnameChange} />
          </label>

          <label>
              Lastname:
              <input type='text' value={lastname} placeholder='Lastname' onChange={handleLastnameChange} />
          </label>

          <label>
              Email:
              <input type='text' value={email} placeholder='Email' onChange={handleEmailChange} />
          </label>

          <label>
              Password:
              <input type='text' value={password} placeholder='Password' onChange={handlePasswordChange} />
        </label></div></div>
      <div className='footer'><button onClick={saveChanges} className='button'><span>Save Changes</span></button></div>
    </div></div>
  )
}

export default Modal
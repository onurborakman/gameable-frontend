import axios from 'axios';
import React, {useEffect, useState} from 'react'
import {useAuth} from '../login/Authentication'
import Modal from './Modal';
import HomeVideo3 from '../../assets/videos/home3.mp4';

export default function Admin() {
  let auth = useAuth();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [modal, setModal] = useState(false);
  useEffect(()=>{
      getUsers();
  }, [users])
  const getUsers = async() =>{
    const data = await axios.get(`https://gameable-api.herokuapp.com/api/user/all`);
    const list = await data.data.data;
    setUsers(list);
  }
  const deleteUser = async(id) => {
    const data = await axios.delete(`https://gameable-api.herokuapp.com/api/user/delete/${id}`);
    const result = await data.data.data;
    setUsers([]);
  }
  const editUser = (user) => {
    setSelectedUser(user);
    setModal(true);
  }
  const userList = () => {
    return users.map(user=>{
      if(user.username !== 'admin' && user.password !== 'adminadmin'){
        return (
          <tr>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.email}</td>
            <td>
              <div className='actions'>
              <button onClick={(e) => { e.preventDefault(); editUser(user) }} className='edit'><span>EDIT</span></button>
              <button onClick={(e) => { e.preventDefault(); deleteUser(user.id) }} className='delete'><span>X</span></button>
              </div>
            </td>
          </tr>
        )
      }
      
    })
  }

  const modalProps = {
    setModal: setModal,
    selectedUser: selectedUser
  }

  return (
    <div className='admin'>
      <video autoPlay loop muted>
        <source src={HomeVideo3} type='video/mp4' />
      </video>
      <div className='overlay'></div>
        {auth.user.username === 'admin' && 
          <table className='table'>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>

            {userList()}
          </table>
        }
        {modal && <Modal {...modalProps}/>}
    </div>
  )
}

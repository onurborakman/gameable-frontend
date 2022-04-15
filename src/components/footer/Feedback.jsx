import React, {useState} from 'react'
import axios from 'axios';
import { apikey, useAuth } from '../login/Authentication';

const Feedback = (props) => {
    //props
    const {setModal} = props
    //authenticated user
    const auth = useAuth();
    //states
    const [first, setFirst] = useState(0);
    const [second, setSecond] = useState(0);
    //function to enter the feedback to the database and localstorage
    const submitFeedback = (e) => {
        e.preventDefault();
        //update the user
      let user = {
        id: auth.user.id,
        username: auth.user.username,
        firstname: auth.user.firstname,
        lastname: auth.user.lastname,
        email: auth.user.email,
        bio: auth.user.bio,
        games: auth.user.games,
        languages: auth.user.languages,
        personalities: auth.user.personalities,
        nationality: auth.user.nationality,
        birthdate: auth.user.birthdate,
        profiles: auth.user.profiles,
        match: auth.user.match,
        teams: [],
        password: auth.user.password,
        feedback: [first, second]
      }
      //update the user on database
      edit(user);
      //update the user on localstorage
      auth.setUser(user);
      //close the modal
      setModal(false);
    }
    //function to edit the user
  const edit = async (updatedUser) => {
    //await axios patch request
    await axios.patch(`https://gameable-api.herokuapp.com/api/user/update/${auth.user.id}`, updatedUser, apikey)
  }
  //jsx
  return (
    <div className='modal-background'>
        <div className='modal-box'>
              <div className='title-button'><button onClick={() => setModal(false)}>X</button></div>
              <div className='title'><h1>Give us a feedback</h1></div>
              <div className='body-container'>
                <div className='body'>
                    <select defaultValue={''} onChange={(e)=>setFirst(e.target.value)}>
                        <option value={''} key={''} selected disabled hidden>Did your performance on games improve?</option>
                        <option value={1} key={1}>1 - Yes</option>
                        <option value={2} key={2}>2 - Neutral</option>
                        <option value={3} key={3}>3 - No</option>
                    </select>
                    <select defaultValue={''} onChange={(e)=>setSecond(e.target.value)}>
                      <option value={''} key={''} selected disabled hidden>Did you start enjoying multiplayer games more?</option>
                      <option value={1} key={1}>1 - Yes</option>
                      <option value={2} key={2}>2 - Neutral</option>
                      <option value={3} key={3}>3 - No</option>
                    </select>
                </div>
              </div>
              <div className='footer'><button onClick={submitFeedback} className='button'><span>Submit Feedback</span></button></div>
        </div>
    </div>
  )
}

export default Feedback
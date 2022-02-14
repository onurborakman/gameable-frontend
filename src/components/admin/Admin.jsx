import axios from 'axios';
import React, {useEffect, useState} from 'react'
import {useAuth} from '../login/Authentication'

export default function Admin() {
  let auth = useAuth();
  const [personalities, setPersonalities] = useState([]);
  useEffect(()=>{
    if(auth.user.username === 'borabora'){
        getPersonalities();
    }
  }, [])
  const getPersonalities = async() =>{
      const data = await axios.get('https://gameable-api.herokuapp.com/api/personality/all')
      setPersonalities(data.data.data)
  }
  //TODO
  return (
    <div>
        {auth.user.username === 'borabora' && 
            <div id="personalities">
                hello
                {personalities.map(personality=>{
                    return(<h1>{personality.question}</h1>)
                })}
            </div>
        }
    </div>
  )
}

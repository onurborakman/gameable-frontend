import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { apikey, useAuth } from '../login/Authentication';
import { useNavigate } from 'react-router-dom';
import HomeVideo3 from '../../assets/videos/home3.mp4';
import Steam from '../../assets/steam.png'
import Discord from '../../assets/discord.png';
import Battlenet from '../../assets/battlenet.png';
import Origin from '../../assets/origin.png';
import Uplay from '../../assets/uplay.png';
import Playstation from '../../assets/psn.png';
import Xbox from '../../assets/xbox.png';
const Up = () => {
    //authenticated user
    const auth = useAuth();
    //navigation
    const navigate = useNavigate();
    //states
    const [userList, setUserList] = useState([]);
    const [sliceCount, setSliceCount] = useState(10);
    //use of useEffects to keep the system in real-time
    useEffect(()=>{
        //listen for user for beforeunload event
        window.addEventListener("beforeunload", cleanMatch);
        return () => window.removeEventListener("beforeunload", cleanMatch)
    })
    useEffect(()=>()=>unMount(),[]);
    useEffect(()=>{
        getMatches()
    },[])
    //function to clean the user's match in database
    const unMount = () => {
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
            match: null,
            teams: auth.user.teams,
            password: auth.user.password,
            feedback: auth.user.feedback
        }
        //update the user in localStorage
        auth.setUser(user)
        //update the user in database
        edit(user);
    }
    //function to clean the match in database with event prevention (prevent default) for event listener
    const cleanMatch = (e) => {
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
            personalities: auth.user.questions,
            nationality: auth.user.nationality,
            birthdate: auth.user.birthdate,
            profiles: auth.user.profiles,
            match: null,
            teams: auth.user.teams,
            password: auth.user.password,
            feedback: auth.user.feedback
        }
        //update the user in localStorage
        auth.setUser(user)
        //update the user in database
        edit(user);
    } 
    //function to edit the user
    const edit = async (updatedUser) => {
        //await for axios patch request to update the user
        await axios.patch(`http://gameable-api.herokuapp.com/api/user/update/${auth.user.id}`, updatedUser, apikey)
    }
    //function to get the matched users
    const getMatches = async() => {
        //await axios get request to get the matches
        const data = await axios.get(`http://gameable-api.herokuapp.com/api/user/all`, {}, apikey);
        //get the data part of the response
        const users = data.data.data;
        //create an empty array
        let result = [];
        //apply the filters to the users array
        users.forEach((user)=>{
            if(user.match && user.username !== auth.user.username){
                if(user.match.game.name === auth.user.match.game.name && user.match.game.ranks[0] === auth.user.match.game.ranks[0] && user.match.game.roles[0] !== auth.user.match.game.roles[0]){
                    //store the filtered users on result array
                    result.push(user);
                }
            }
        })
        //set the state
        setUserList(result);
    }
    //function to calculate age from the user's database information
    const getAge = (birthday) => {
        if (birthday) {
            const today = new Date();
            const birthdate = new Date(birthday);
            let age = today.getFullYear() - birthdate.getFullYear();
            const ageMonth = today.getMonth() - birthdate.getMonth();
            if (ageMonth < 0 || (ageMonth === 0 && today.getDate() < birthdate.getDate())) {
                age--;
            }
            return `${age} years old`;
        } else {
            return '';
        }
    }
    //Function to show more users
    const showMore = () => {
        setSliceCount(sliceCount + 10);
    }
    //function to refresh the page
    const refresh = () => {
        getMatches();
    }
    //function to create cards for each user
    const users = userList.map(user=>{
        return(
            <div className='user-card'>
                <div><h2>{user.username}</h2>
                <h4>{user.firstname} {user.lastname}</h4>
                <h5>{user.birthdate && getAge(user.birthdate)} years old {user.nationality}</h5>
                </div>
                <div className='languages'>
                {
                    user.languages[0] && <p>Primary Language: {user.languages[0]}</p>
                }
                {
                    user.languages[1] && <p>Secondary Language: {user.languages[1]}</p>
                }
                {
                    user.personalities && user.personalities.map(personality=>{
                        return(
                            <div>
                                <p>{personality.question}: {personality.answers[0]}</p>
                            </div>
                        )
                    })
                }
                </div>
                <div className='profiles'>
                    {user.profiles[0] && user.profiles[0] !== '' && <a href={user.profiles[0]}><img src={Steam} alt='Steam' width='50px' height='50px'/></a>}
                    {user.profiles[1] && user.profiles[1] !== '' && <a href={user.profiles[1]}><img src={Discord} alt='Discord' width='75px' height='50px' /></a>}
                    {user.profiles[2] && user.profiles[2] !== '' && <a href={user.profiles[2]}><img src={Uplay} alt='Uplay' width='50px' height='50px' /></a>}
                    {user.profiles[3] && user.profiles[3] !== '' && <a href={user.profiles[3]}><img src={Battlenet} alt='Battlenet' width='50px' height='50px' /></a>}
                    {user.profiles[4] && user.profiles[4] !== '' && <a href={user.profiles[4]}><img src={Origin} alt='Origin' width='50px' height='50px' /></a>}
                    {user.profiles[5] && user.profiles[5] !== '' && <a href={user.profiles[5]} className='playstation'><img src={Playstation} alt='Playstation' width='50px' height='50px' /></a>}
                    {user.profiles[6] && user.profiles[6] !== '' && <a href={user.profiles[6]}><img src={Xbox} alt='Xbox' width='50px' height='50px' /></a>}
                </div>
            </div>
        )
    })
    //UI functionality
    const usersJSX = () => {
        if (users.length > 0) {
            return(
                <div>
                    {users.slice(0, sliceCount)}
                    <div className='button-container' > <button onClick={showMore}>{'<<'}Show More{'>>'}</button></div>
                </div>
            )
        }else{
            return(
                <div>
                    <p>There are currently no users online</p>
                </div>
            )
        }
    }
    //JSX
  return (
      <div className='up'>
          <video autoPlay loop muted playsInline>
              <source src={HomeVideo3} type='video/mp4' />
          </video>
          <div className='overlay'></div>
          <div className='refresh-container'><button onClick={refresh}>Refresh</button></div>
          {usersJSX()}
      </div>
  )
}

export default Up
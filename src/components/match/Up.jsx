import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { useAuth } from '../login/Authentication';
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
    const auth = useAuth();
    const navigate = useNavigate();
    const [userList, setUserList] = useState([]);
    const [sliceCount, setSliceCount] = useState(10);
    useEffect(()=>{
        window.addEventListener("beforeunload", cleanMatch);
        return () => window.removeEventListener("beforeunload", cleanMatch)
    })
    useEffect(()=>()=>unMount(),[]);
    useEffect(()=>{
        getMatches()
    },[])

    const unMount = () => {
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
        auth.setUser(user)
        edit(user);
    }
    const cleanMatch = (e) => {
        e.preventDefault();
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
        auth.setUser(user)
        edit(user);
    } 
    const edit = async (updatedUser) => {
        await axios.patch(`https://gameable-api.herokuapp.com/api/user/update/${auth.user.id}`, updatedUser)
    }

    const getMatches = async() => {
        const data = await axios.get(`https://gameable-api.herokuapp.com/api/user/all`);
        const users = data.data.data;
        let result = [];
        users.forEach((user)=>{
            if(user.match && user.username !== auth.user.username){
                if(user.match.game.name === auth.user.match.game.name && user.match.game.ranks[0] === auth.user.match.game.ranks[0] && user.match.game.roles[0] !== auth.user.match.game.roles[0]){
                    result.push(user);
                }
            }
        })
        console.log(result);
        setUserList(result);
    }

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

    const showMore = () => {
        setSliceCount(sliceCount + 10);
    }

    const refresh = () => {
        getMatches();
    }

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

  return (
      <div className='up'>
          <video autoPlay loop muted playsInline>
              <source src={HomeVideo3} type='video/mp4' />
          </video>
          <div className='overlay'></div>
          <div className='refresh-container'><button onClick={refresh}>Refresh</button></div>
          <div>
            {users.slice(0, sliceCount)}
              <div className='button-container'><button onClick={showMore}>{'<<'}Show More{'>>'}</button></div>
          </div>
      </div>
  )
}

export default Up
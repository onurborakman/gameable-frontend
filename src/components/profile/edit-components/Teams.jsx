import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { apikey } from '../../login/Authentication';

const Teams = (props) => {
    //states
    const [teamList, setTeamList] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState('');
    //props
    const {handleAddTeam} = props;
    //function to call when mounted
    useEffect(()=>{
        allTeams();
    },[]);
    //function to get all teams
    const allTeams = async() => {
        //await axios get request
        const data = await axios.get(`https://gameable-api.herokuapp.com/api/team/all`, apikey);
        //get the data
        const teams = await data.data.data;
        //update the state
        setTeamList(teams);
    }
    //create dropdown options out of the teams list
    const teamOptions = teamList.map(team => <option value={JSON.stringify(team)} key={JSON.stringify(team)
}>{team.name}</option>)
//function to handle selectedTeam change
    const handleTeamChange = (e) => {
        setSelectedTeam(JSON.parse(e.target.value));
    }
    //function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault()
        const team = {
            id: selectedTeam.id,
            name: selectedTeam.name,
            bio: selectedTeam.bio,
            roster: [],
            applications: []
        }
        handleAddTeam(team);
    }
    //jsx
  return (
    <div>
          <select onChange={handleTeamChange}>
              <option value={''}>Please select a team</option>
              {teamOptions}
          </select>
          <button onClick={handleSubmit}>Add Team</button>
    </div>
  )
}

export default Teams
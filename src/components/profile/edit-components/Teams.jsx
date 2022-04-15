import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { apikey } from '../../login/Authentication';

const Teams = (props) => {
    const [teamList, setTeamList] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState('');
    const {handleAddTeam} = props;
    useEffect(()=>{
        allTeams();
    },[]);
    const allTeams = async() => {
        const data = await axios.get(`http://gameable-api.herokuapp.com/api/team/all`, {}, apikey);
        const teams = await data.data.data;
        setTeamList(teams);
    }
    const teamOptions = teamList.map(team => <option value={JSON.stringify(team)} key={JSON.stringify(team)
}>{team.name}</option>)
    const handleTeamChange = (e) => {
        setSelectedTeam(JSON.parse(e.target.value));
    }
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
import React from 'react'
import NationalityList from '../../../assets/data/nationalities.json';

const Nationality = (props) => {
    //Props
    const {nationality, handleNationality} = props;
    //Getting the list of nationalities from the JSON data.
    const getNationalityList = () => {
        return NationalityList.map(nation=>{
            return (
                <option value={nation} key={nation}>{nation}</option>
            )
        })
    }
  return (
        <label>
            Nationality: 
            <select onChange={handleNationality} defaultValue={nationality || ''}>
              <option value={nationality || ''} selected disabled hidden key={nationality || ''}>{nationality || 'Choose a nationality'}</option>
                {getNationalityList()}
            </select>
        </label>
  )
}

export default Nationality
import React from 'react'
import NationalityList from '../../../assets/data/nationalities.json';

const Nationality = (props) => {
    //Props
    const {nationality, handleNationality} = props;
    //Getting the list of nationalities from the JSON data.
    const getNationalityList = () => {
        return NationalityList.map(nation=>{
            return (
                <option value={nation}>{nation}</option>
            )
        })
    }
  return (
        <label>
            Nationality: 
            <select onChange={handleNationality}>
                <option value={nationality || ''}>{nationality || 'Choose a nationality'}</option>
                {getNationalityList()}
            </select>
        </label>
  )
}

export default Nationality
import React from 'react'
import NationalityList from '../../../assets/data/nationalities.json';

const Nationality = (props) => {
    const {nationality, handleNationality} = props;
    const getNationalityList = () => {
        return NationalityList.map(nation=>{
            return (
                <option value={nation}>{nation}</option>
            )
        })
    }
  return (
    <div>
        <label>
            Nationality
            <select onChange={handleNationality}>
                <option value={nationality || ''}>{nationality || 'Choose a nationality'}</option>
                {getNationalityList()}
            </select>
        </label>
    </div>
  )
}

export default Nationality
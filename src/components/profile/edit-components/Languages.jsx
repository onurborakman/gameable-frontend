import React from 'react'
import LanguageList from '../../../assets/data/languages.json';

const Languages = (props) => {
    //Props
    const {handlePrimaryLanguage, handleSecondaryLanguage, languages} = props;
    //Getting the list of languages from the JSON data.
    const getLanguageList = () => {
        return LanguageList.map(language => {
            return (
                <option value={language.name} key={language.name}>{language.name}</option>
            )
        })
    }
  return (
    <div className='language-box'>
          <label>
              Primary Language:
              <select onChange={handlePrimaryLanguage} defaultValue={languages[0] || ''}>
                  <option value={languages[0] || ''} selected disabled hidden key={languages[0] || ''}>{languages[0] || 'Please select a primary language'}</option>
                  {getLanguageList()}
              </select>
          </label>

          <label>
              Secondary Language:
              <select onChange={handleSecondaryLanguage} defaultValue={languages[1] || ''}>
                  <option value={languages[1] || ''} selected disabled hidden key={languages[1] || ''}>{languages[1] || 'Please select a secondary language'}</option>
                  {getLanguageList()}
              </select>
          </label>
    </div>
  )
}

export default Languages
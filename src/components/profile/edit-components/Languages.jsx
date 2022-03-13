import React from 'react'
import LanguageList from '../../../assets/data/languages.json';

const Languages = (props) => {
    //Props
    const {handlePrimaryLanguage, handleSecondaryLanguage, languages} = props;
    //Getting the list of languages from the JSON data.
    const getLanguageList = () => {
        return LanguageList.map(language => {
            return (
                <option value={language.name}>{language.name}</option>
            )
        })
    }
  return (
    <div>
          <label>
              Primary Language
              <select onChange={handlePrimaryLanguage}>
                  <option value={languages[0] || ''}>{languages[0] || 'Please select a primary language'}</option>
                  {getLanguageList()}
              </select>
          </label>

          <label>
              Secondary Language
              <select onChange={handleSecondaryLanguage} >
                  <option value={languages[1] || null}>{languages[1] || 'Please select a secondary language'}</option>
                  {getLanguageList()}
              </select>
          </label>
    </div>
  )
}

export default Languages
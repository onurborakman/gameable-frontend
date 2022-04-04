import React from 'react'

const Feedback = (props) => {
    const {setModal} = props

    const submitFeedback = (e) => {
        e.preventDefault();
    }
  return (
    <div className='modal-background'>
        <div className='modal-box'>
              <div className='title-button'><button onClick={() => setModal(false)}>X</button></div>
              <div className='title'><h1>Give us a feedback</h1></div>
              <div className='body-container'>
                <div className='body'>
                    <select defaultValue={''}>
                        <option value={''} key={''} selected disabled hidden>Did your performance on games improve?</option>
                        <option value={1} key={1}>1 - Yes</option>
                        <option value={2} key={2}>2 - Neutral</option>
                        <option value={3} key={3}>3 - No</option>
                    </select>
                </div>
              </div>
              <div className='footer'><button onClick={submitFeedback} className='button'><span>Submit Feedback</span></button></div>
        </div>
    </div>
  )
}

export default Feedback
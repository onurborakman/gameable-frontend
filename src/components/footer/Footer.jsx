import React, { useState } from 'react'
import Feedback from './Feedback';

const Footer = () => {
  //state
  const [modal, setModal] = useState(false);
  //jsx
  return (
    <div>
        {modal && <Feedback setModal={setModal}/>}
        <div className='footer-class'>
          <p>Copyright © 2022 Gameable</p>
          <button onClick={()=>setModal(true)}>Please give us a feedback</button>
        </div>
    </div>
  )
}

export default Footer
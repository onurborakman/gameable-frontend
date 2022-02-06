import React from 'react';
import { useAuth } from '../login/Authentication';

export default function Home() {
  let auth = useAuth();

  if(!auth.user){
    return(
      <div>
        THIS IS NOT LOGGED IN
      </div>
    )
  }else{
    return(
      <div>
        THIS IS LOGGED IN
      </div>
    )
  }
}

import React from 'react';
import {Outlet} from 'react-router-dom';
import { AuthNavbar } from '../login/Authentication';

export default function Navbar() {
  return (
      <React.Fragment>
          <AuthNavbar/>
          <Outlet/>
      </React.Fragment>
  );
}

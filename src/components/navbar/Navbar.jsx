import React from 'react';
import {Outlet} from 'react-router-dom';
import Footer from '../footer/Footer';
import { AuthNavbar } from '../login/Authentication';

export default function Navbar() {
  //JSX
  return (
      <React.Fragment>
          <AuthNavbar/>
          <Outlet/>
          <Footer/>
      </React.Fragment>
  );
}

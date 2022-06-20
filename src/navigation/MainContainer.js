import React, { useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import NavBar from './NavBar';
import Login from '../screens/Login';
import { getSuccessfulLogin } from '../selectors/login';

function MainContainer() {

  const existsToken = useSelector((state) => getSuccessfulLogin(state));  
  const sessionStorage = window.sessionStorage.getItem('token');

  const isAuthenticated = () => existsToken || sessionStorage !== null;
  
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {
        (isAuthenticated()) ?
          <NavBar />
          :
          <Login />
      }
    </div>
  );
}

export default MainContainer;

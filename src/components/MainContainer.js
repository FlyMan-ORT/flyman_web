import React from 'react';
import NavBar from './NavBar';
import Login from './Login';

function MainContainer() {
  const isAuthenticated = () => false;
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

import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import Login from '../screens/Login';
import GlobalContext from '../components/globals/context';

function MainContainer() {
  const [token, setToken] = useState('');

  // useEffect(async () => {
  //     const token = await checkToken();
  //     setToken(token);
  // }, []);

  const isAuthenticated = () => token;

  const authUser = (token) => {
      if (!token) throw new Error();
      console.log('Aca deberia ir al secure storage');
      setToken(token);
      // saveToken(token);
  }

  // const checkToken = async () => {
  //     const token = await retrieveToken();
  //     return token;
  // }

  const logout = async () => {
      // await removeToken();
      setToken(null);
  }
  
  return (
    <GlobalContext.Provider value={{ authUser }}>

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {
          (isAuthenticated()) ?
            <NavBar />
            :
            <Login />
        }
      </div>
    </GlobalContext.Provider>
  );
}

export default MainContainer;

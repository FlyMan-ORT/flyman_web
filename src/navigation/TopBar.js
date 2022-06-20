import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { logout } from '../features/login';
import { getSuccessfulLogin } from '../selectors/login';
import LogoutIcon from '@mui/icons-material/Logout';

const topBarDivStyle = {
  display: 'flex',
  flexDirection: 'row',
  padding: 15
}

const loginButtonStyle = {
  marginLeft: 'auto',
  paddingRight: 10,
}

function TopBar() {
  const existsToken = useSelector((state) => getSuccessfulLogin(state));
  const sessionStorage = window.sessionStorage.getItem('token');
  const isAuthenticated = () => existsToken || sessionStorage !== null;
  const dispatch = useDispatch();
  const logoutUser = () => {
    dispatch(logout());
  }
  return (
    <div style={topBarDivStyle}>
      <img alt="logo" src={"https://www.mykeego.com/img/logo.svg"} height='50' />
      <div style={loginButtonStyle}>
        {
          (isAuthenticated()) ?
            <Button variant="text" onClick={() => logoutUser()}> <LogoutIcon style={{marginRight:3}}/> Cerrar Sesión</Button>
            :
            null
        }
      </div>
    </div>
  );
}

export default TopBar;

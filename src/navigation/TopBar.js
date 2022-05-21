import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { logout } from '../features/login';

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
  const dispatch = useDispatch();
  const logoutUser = () => {
    dispatch(logout());
  }
  return (
    <div style={topBarDivStyle}>
      <img alt="logo" src={"https://www.mykeego.com/img/logo.svg"} height='50' />
      <div style={loginButtonStyle}>
        <Button variant="contained" onClick={() => logoutUser()}>Logout</Button>
      </div>
    </div>
  );
}

export default TopBar;

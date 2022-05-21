import React from 'react';
import Button from '@mui/material/Button';

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
  return (
    <div style={topBarDivStyle}>
      <img alt="logo" src={"https://www.mykeego.com/img/logo.svg"} height='50' />
      <div style={loginButtonStyle}>
        <Button variant="contained">Logout</Button>
      </div>
    </div>
  );
}

export default TopBar;

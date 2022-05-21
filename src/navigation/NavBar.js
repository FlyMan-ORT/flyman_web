import React from 'react';
import { BrowserRouter as Router,Link, Routes, Route } from 'react-router-dom';
import Home from '../screens/Home';
import Users from '../screens/Users';
import Historic from '../screens/Historic';
import Button from '@mui/material/Button';

const linkStyle = {  
    textDecoration: "none",
    color: 'white',
    padding: 5,
  };

  const buttonStyle = {  
    marginBottom:10    
  };

  const navBarDivStyle = { 
    display: 'flex', 
    flexDirection: 'column', 
    padding:15
  };



function NavBar() {
    return (
        <Router>
            <div style={navBarDivStyle}>
                <Button variant="contained" style={buttonStyle} >
                    <Link to="/" style={linkStyle}>Reservas</Link>
                </Button>
                <Button variant="contained" style={buttonStyle}>
                    <Link to="/Users" style={linkStyle}>Usuarios</Link>
                </Button>
                <Button variant="contained" style={buttonStyle}>
                    <Link to="/Historic" style={linkStyle}>Historial</Link>
                </Button>   
                <Button variant="contained" style={buttonStyle}>
                    <Link to="/Map" style={linkStyle}>Mapa</Link>
                </Button>
            </div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Users" element={<Users />} />
                <Route path="/Historic" element={<Historic />} />                
            </Routes>

        </Router>
    );
};

export default NavBar;
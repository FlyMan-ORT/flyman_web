import React from 'react';
import { BrowserRouter as Router,Link, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Users from './Users';
import Historic from './Historic';

const ulStyle = {
    listStyleType:'none',
    margin: 0,
    padding: 0,
    width: '200px',
    backgroundColor: '#f1f1f1'
}

const liStyle = {
    display: 'block',
    color: '#000',
    padding: '16px',
    textDecoration: 'none',
    
}

function NavBar() {
    return (
        <Router>
            <div style={{marginTop:'40'}}>
                <ul style={ulStyle}>
                <li style={liStyle}><Link to="/">Reservas</Link></li>
                <li style={liStyle}><Link to="/Users">Usuarios</Link></li>
                <li style={liStyle}><Link to="/Historic">Historial</Link></li>                
                </ul>
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
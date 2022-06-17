import { useState } from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import Home from '../screens/Home';
import Users from '../screens/Users';
import Historic from '../screens/Historic';
import Button from '@mui/material/Button';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

import { Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const linkStyle = {
    textDecoration: "none",
    color: 'white',
    padding: 5,
};

const buttonStyle = {
    align: 'left',
    marginBottom: 10,
    width: '100%'
};

const navBarDivStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 15,    

};



function NavBar() {
    const [drawerShow, setDrawerShow] = useState(false);
    const handleClick = () => { setDrawerShow(false) };

    return (
        <Router>
            <div style={{marginLeft: 10}}>
            <Button onClick={() => setDrawerShow(!drawerShow)}><MenuIcon></MenuIcon></Button>
            </div>
            
            <Drawer open={drawerShow} onClose={() => handleClick()}>
                <div style={{ backgroundColor: '#e5e5e5', width: '100%', padding: 10 }}>
                    <img style={{ width: 100 }} src="https://www.mykeego.com/img/KEEGOblanco.png"></img>
                </div>
                
                <div style={navBarDivStyle}>
                    <Link to="/" style={linkStyle}>
                        <Button variant="text" style={buttonStyle} onClick={() => setDrawerShow(false)} >
                        <CarCrashIcon alignSelf="left"/> Autos
                        </Button>
                    </Link>
                    <Link to="/Users" style={linkStyle}>
                        <Button variant="text" style={buttonStyle} onClick={() => setDrawerShow(false)}>
                          <PeopleAltIcon/>  Usuarios
                        </Button>
                    </Link>
                    <Link to="/Historic" style={linkStyle}>
                        <Button variant="text" style={buttonStyle} onClick={() => setDrawerShow(false)}>
                        <ManageSearchIcon/>    Historial 
                        </Button>
                    </Link>
                </div>

            </Drawer>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Users" element={<Users />} />
                <Route path="/Historic" element={<Historic />} />
            </Routes>

        </Router>
    );
};

export default NavBar;
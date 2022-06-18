import { useState } from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import Home from '../screens/Home';
import Users from '../screens/Users';
import Historic from '../screens/Historic';
import Button from '@mui/material/Button';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';

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
            <div style={{ marginLeft: 10 }}>
                <Button onClick={() => setDrawerShow(!drawerShow)}><MenuIcon></MenuIcon></Button>
            </div>

            <Drawer open={drawerShow} onClose={() => handleClick()}>
                <div style={{ backgroundColor: '#e5e5e5', width: '100%', padding: 10 }}>
                    <img style={{ width: 100 }} src="https://www.mykeego.com/img/KEEGOblanco.png"></img>
                </div>

                <Box sx={{ width: 180, padding: 0 }}>
                    <List>
                        {[
                            { key:'/',page: '/', text: 'Autos' },
                            { key:'Users',page: '/Users', text: 'Usuarios' },
                            { key:'Historic',page: '/Historic', text: 'Historial' },
                        ].map((menuItem) => (
                            <ListItem key={menuItem.key} style={{ padding: 0 }}>
                                <Link to={menuItem.page} style={{ textDecoration: 'none', color: '#000' }}>
                                    <ListItemButton onClick={() => setDrawerShow(false)}>
                                        <ListItemIcon>
                                            <DirectionsCarIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={menuItem.text} style={{ width: 120, padding: 8 }} />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        ))}

                    </List>
                </Box>
            </Drawer>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Users" element={<Users />} />
                <Route path="/Historic" element={<Historic />} />
            </Routes>

        </Router >
    );
};

export default NavBar;
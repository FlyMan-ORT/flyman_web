import React from 'react';
import Button from '@mui/material/Button';

const loginButtonStyle = {
    marginLeft: 'auto',
    paddingRight: 10
}

function Login() {
    return (
        <div >
            <h1>Bienvenidos a MyKeego</h1>
            <div style={loginButtonStyle}>
                <Button variant="contained">Iniciar Sesión</Button>
            </div>

        </div>
    );
}

export default Login;
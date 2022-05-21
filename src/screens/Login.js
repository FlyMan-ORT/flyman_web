import React, { useEffect, useState, useContext } from 'react';
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import GlobalContext from '../components/globals/context';
import { login } from '../api/users';

const loginButtonStyle = {
    marginLeft: 'auto',
    paddingRight: 10
}

const containerDivStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
}


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);
    
    const PASSWORD_VISIBLE = 'eye';
    const PASSWORD_NOT_VISIBLE = 'eye-slash';
    
    const { authUser } = useContext(GlobalContext);
    
    const userLogin = async () => {
        if (!email || !password) return;
        try {
            let response = await login(email, password);
            if (response.token) authUser(response.token);
        } catch (error) {
            openAlert();
        }
    }
    
    const onPress = () => setIsPasswordVisible(prev => !prev);
    
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: 200 }}>

            <div style={containerDivStyle}>
                <Card>
                    <Card.Header as="h5">Panel de administrador Keego</Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Usuario</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={e => setEmail(e.target.value)}
                                    autoFocus
                                />
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                        <Button variant="contained" style={{ width: '100%' }} onClick={() => userLogin()
                        }>Iniciar Sesión</Button>
                    </Card.Body>
                </Card>
            </div>

        </div>
    );
}

const openAlert = () => alert('Ups!', 'Ocurrio un error al hacer login.', [{ text: 'OK', style: 'cancel' }]);

export default Login;
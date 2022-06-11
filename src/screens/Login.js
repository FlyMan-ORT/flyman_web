import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { postLogin } from '../features/login';
import { isFailedLogin } from '../selectors/login';

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
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);
    const failedLogin = useSelector(state => isFailedLogin(state));
        
    const userLogin = async () => {
        if (!email || !password) return;
        dispatch(postLogin({email, password}));
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
                                {failedLogin && (<span style={{color: 'red', fontSize: '14px'}}>La contraseña o el usuario es incorrecto</span>)}
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

export default Login;
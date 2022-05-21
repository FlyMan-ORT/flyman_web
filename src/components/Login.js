import React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'

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
                                    onChange={() => { }}
                                    autoFocus
                                />
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    onChange={() => { }}
                                />
                            </Form.Group>
                        </Form>
                        <Button variant="contained" style={{width:'100%'}}>Iniciar Sesión</Button>
                    </Card.Body>
                </Card>
            </div>

        </div>
    );
}

export default Login;
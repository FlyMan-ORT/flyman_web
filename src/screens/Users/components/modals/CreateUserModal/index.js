import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ButtonBootstrap from 'react-bootstrap/Button'

const CreateUserModal = ({ show, onHide, onCreateUser }) => {
    const [user, setUser] = useState({ name: '', email: '', phone: '', pin: '', admin: false, password: '' });
    
    return (
        <Modal show={show}>
            <Modal.Header >
                <Modal.Title>Alta de usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlid="createUser.form">
                        <Form.Label>Nombre y apellido</Form.Label>
                        <Form.Control
                            controlid="createUser.form.name"
                            type="text"
                            onChange={value => setUser({ ...user, name: value.target.value })}
                            autoFocus
                        />
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            controlid='createUser.form.email'
                            type='email'
                            onChange={value => setUser({ ...user, email: value.target.value })}

                        />
                        <Form.Label>Telefono</Form.Label>
                        <Form.Control
                            controlid='createUser.form.phone'
                            type="phone"
                            onChange={value => setUser({ ...user, phone: value.target.value })}

                        />
                        <Form.Label>Pin</Form.Label>
                        <Form.Control

                            controlid='createUser.form.pin'
                            type="number"
                            onChange={value => setUser({ ...user, pin: value.target.value })}

                        />
                        <Form.Label>Usuario administrador</Form.Label>
                        <Form.Check
                            controlid='createUser.form.admin'
                            type="switch"
                            onChange={value => setUser({ ...user, admin: value.target.checked })}

                        />
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            controlid='createUser.form.password'
                            type="password"
                            onChange={value => setUser({ ...user, password: value.target.value })}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <ButtonBootstrap
                    variant="secondary"
                    onClick={() => onHide(setUser({ name: '', email: '', phone: '', pin: '', admin: false, password: '' }))}
                >
                    Cerrar
                </ButtonBootstrap>
                <ButtonBootstrap
                    variant="primary"
                    style={{ backgroundColor: '#1976d2' }}
                    onClick={() => { onCreateUser(user); onHide(setUser({ name: '', email: '', phone: '', pin: '', admin: false, password: '' }))}}
                >
                    Guardar cambios
                </ButtonBootstrap>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateUserModal;
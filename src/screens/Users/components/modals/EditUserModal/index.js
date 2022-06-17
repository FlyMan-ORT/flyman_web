import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ButtonBootstrap from 'react-bootstrap/Button'

const EditUserModal = ({ show, onHide, userToEdit, onEditUser }) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        setUser({ ...userToEdit });
    }, [show])


    return (
        <Modal show={show}>
            <Modal.Header >
                <Modal.Title>Editar datos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlid="editUser.form">
                        <Form.Label>Nombre y apellido</Form.Label>
                        <Form.Control
                            controlid="editUser.form.name"
                            type="text"
                            defaultValue={user.name}
                            onChange={value => setUser({ ...user, name: value.target.value })}
                            autoFocus
                        />
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            controlid="editUser.form.email"
                            type="email"
                            defaultValue={user.email}
                            onChange={value => setUser({ ...user, email: value.target.value })}
                            autoFocus
                        />
                        <Form.Label>Telefono</Form.Label>
                        <Form.Control
                            controlid="editUser.form.phone"
                            type="phone"
                            defaultValue={user.phone}
                            onChange={value => setUser({ ...user, phone: value.target.value })}
                            autoFocus
                        />
                        <Form.Label>Pin</Form.Label>
                        <Form.Control
                            controlid="editUser.form.pin"
                            type="number"
                            defaultValue={user.pin}
                            onChange={value => setUser({ ...user, pin: value.target.value })}
                            autoFocus
                        />
                        <Form.Label>Usuario administrador</Form.Label>
                        <Form.Check
                            controlid="editUser.form.admin"
                            type="switch"
                            defaultChecked={user.admin}
                            onChange={value => setUser({ ...user, admin: value.target.checked })}
                            autoFocus
                        />
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            controlid="editUser.form.password"
                            type="password"
                            onChange={value => setUser({ ...user, password: value.target.value })}
                            autoFocus
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <ButtonBootstrap
                    variant="secondary"
                    onClick={onHide}
                >
                    Cerrar
                </ButtonBootstrap>
                <ButtonBootstrap
                    variant="primary"
                    style={{ backgroundColor: '#1976d2' }}
                    onClick={() => { onEditUser(user); }}
                >
                    Guardar cambios
                </ButtonBootstrap>
            </Modal.Footer>
        </Modal>
    )
}

export default EditUserModal;
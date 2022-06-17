import React from 'react'
import Modal from 'react-bootstrap/Modal';
import ButtonBootstrap from 'react-bootstrap/Button'

const DeleteUserModal = ({ show, onHide, user, onDelete }) => {
    return (
        <Modal show={show} onHide={onHide} animation={true}>
            <Modal.Header closeButton>
                <Modal.Title>Eliminar usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>¿Está seguro de querer borrar al usuario {user.email}?</Modal.Body>
            <Modal.Footer>
                <ButtonBootstrap variant="secondary" onClick={onHide}>
                    Cancelar
                </ButtonBootstrap>
                <ButtonBootstrap variant="danger" onClick={() => { onDelete(user.id) }}>
                    Confirmar
                </ButtonBootstrap>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteUserModal;

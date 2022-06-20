import React from 'react'
import { Modal } from 'react-bootstrap';
import ButtonBootstrap from 'react-bootstrap/Button'

const PinModal = ({ show, onHide, user }) => {
    return (
        <Modal show={show} onHide={onHide} size="sm">
            <Modal.Header closeButton>
                <Modal.Title > {user.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{marginLeft:'auto', marginRight:'auto'}}>  {user.pin} </Modal.Body>
            <Modal.Footer>
                <ButtonBootstrap variant="secondary" onClick={() => {
                    onHide();
                }}>
                    Cerrar
                </ButtonBootstrap>
            </Modal.Footer>
        </Modal>
    )
}

export default PinModal;
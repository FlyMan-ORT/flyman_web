import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ButtonBootstrap from 'react-bootstrap/Button';


const ConfirmCancelModal = ({ show, onHide, id, onCancel }) => {
    return (
        <Modal show={show} onHide={onHide} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar reserva</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Está seguro de querer borrar la reserva?</Modal.Body>
        <Modal.Footer>
          <ButtonBootstrap variant="secondary" onClick={() => {
                        onHide();
                    }}>
            Cancelar
          </ButtonBootstrap>
          <ButtonBootstrap variant="danger" onClick={() => {
                        onCancel(id)
                    }}>
            Confirmar
          </ButtonBootstrap>
        </Modal.Footer>
      </Modal>
    )
}

export default ConfirmCancelModal;
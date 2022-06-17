import React from 'react'
import Modal from 'react-bootstrap/Modal';

const NoDataModal = ({ show, onHide }) => {
    return (

        <Modal
            size="sm"
            show={show}
            onHide={onHide}
            aria-labelledby="example-modal-sizes-title-sm"
            style={{ textAlignL: 'center' }}
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                    Detalles del servicio
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>El servicio aún no ha finalizado.</p>
                <p>No pueden mostrarse los detalles.</p>
            </Modal.Body>
        </Modal>
    )
}

export default NoDataModal;
import React from 'react'
import Modal from 'react-bootstrap/Modal';

const MapModal = ({ show, onHide, position }) => {
    return (
        <Modal show={show} onHide={onHide} size={'xl'}  >
            <Modal.Header closeButton>
                <Modal.Title>Vista de mapa</Modal.Title>
            </Modal.Header>
            <Modal.Body style={mapModalStyle}>
                <div dangerouslySetInnerHTML={{ __html: '<iframe width = "800" height = "650" style = "border:0" loading = "lazy" allowfullscreen referrerpolicy = "no-referrer-when-downgrade" src = "https://maps.google.com/maps?q=' + position.latitude + ',' + position.longitude + '&hl=es&z=14&amp;output=embed"></iframe >' }}></div>
            </Modal.Body>
        </Modal>
    )
}

const mapModalStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
}

export default MapModal;
import moment from 'moment';
import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card'

const AssignmentsModal = ({ show, onHide, reservations }) => {
    return (
        <Modal show={show} onHide={onHide} size="sm">
            <Modal.Header closeButton>
                <Modal.Title>Asignaciones</Modal.Title>
            </Modal.Header>
            <Modal.Body>{reservations.map((reservation) => {
                return (
                    <Card
                        key={reservation.id}
                        border={(moment(reservation.startTime).isAfter(moment(), 'hour')) ? "success" : "danger"}
                        style={{ marginBottom: 10 }}
                    >
                        <Card.Header style={{ alignItems: 'center' }}>
                            <b>{moment(reservation.startTime).format('hh:mm A')} : {moment(reservation.endTime).format('hh:mm A')}</b>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>Patente: {reservation.car.plate}</Card.Text>
                            <Card.Text>Parking: {reservation.car.parkingName} </Card.Text>
                            <Card.Text>Ubicacion: {reservation.car.idParkingSlot} </Card.Text>
                        </Card.Body>
                    </Card>
                )
            })}
            </Modal.Body>
        </Modal>
    )
}

export default AssignmentsModal;
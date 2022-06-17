import moment from 'moment';
import React from 'react'
import { Card, Modal } from 'react-bootstrap'

const ReservationsModal = ({ show, onHide, reservations }) => {
    return (
        <Modal show={show} onHide={onHide} size="m">
            <Modal.Header closeButton>
                <Modal.Title>Reservas del dia </Modal.Title>
            </Modal.Header>
            <Modal.Body>{reservations.map(reservation => {
                if (moment().isSame(moment(reservation.startTime), 'day')) {
                    return (
                        <Card
                            key={reservation.id}
                            border={(moment(reservation.startTime).isAfter(moment(), 'hour')) ? "success" : "danger"}
                            style={{ marginBottom: 10 }}
                        >
                            <Card.Header style={{ alignItems: 'center' }}>
                                <b>{moment(reservation.startTime).format('hh:mm A')} - {moment(reservation.endTime).format('hh:mm A')}</b>
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>{reservation.user.email}</Card.Text>
                            </Card.Body>
                        </Card>
                    )
                }
            })}
            </Modal.Body>
        </Modal>
    )
}

export default ReservationsModal;
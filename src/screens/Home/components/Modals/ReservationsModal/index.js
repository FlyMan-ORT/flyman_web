import moment from 'moment';
import React from 'react';
import { Card, Modal } from 'react-bootstrap';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import ButtonBootstrap from 'react-bootstrap/Button';

const CreateReservationModal = ({ show, onHide, reservations, onCreate }) => {
    return (
        <Modal show={show} onHide={onHide} size="m">
            <Modal.Header closeButton>
                <Modal.Title>Reservas del dia </Modal.Title>
            </Modal.Header>
            <Modal.Body>{reservations.map(reservation => {
                if (moment().isSame(moment(reservation.startTime), 'day') && (reservation.status === 'RESERVED' || reservation.status === 'ACTIVE')) {
                    return (
                        <Card border={(moment(reservation.startTime).isAfter(moment(), 'minute')) ? "success" : "danger"}
                            style={{ marginBottom: 10 }}>
                            <Card.Header style={{ alignItems: 'center' }}>
                                <b>{moment(reservation.startTime).format('hh:mm A')} - {moment(reservation.endTime).format('hh:mm A')}</b>
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>{reservation.user.email}</Card.Text>

                            </Card.Body>
                         <ButtonBootstrap variant="text" color= "#ff0000" onClick={() => {
                                onCreate(reservation)
                            }}>
                                Eliminar reserva
                            </ButtonBootstrap>
                        </Card>
                    )
                }
            })}
            </Modal.Body>
        </Modal>
    )
}

export default CreateReservationModal;
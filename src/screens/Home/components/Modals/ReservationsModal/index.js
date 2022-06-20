import moment from 'moment';
import React from 'react';
import { Badge, Card, Modal } from 'react-bootstrap';
import ButtonBootstrap from 'react-bootstrap/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const CreateReservationModal = ({ show, onHide, reservations, onCreate }) => {
    return (
        <Modal show={show} onHide={onHide} size="m">
            <Modal.Header closeButton>
                <Modal.Title>Reservas del dia </Modal.Title>
            </Modal.Header>
            <Modal.Body>{reservations.map(reservation => {
                const bookingTypeColor = reservation.bookingType === 'MAINTENANCE' ? 'warning' : 'primary'
                if (moment().isSame(moment(reservation.startTime), 'day') && (reservation.status === 'RESERVED' || reservation.status === 'ACTIVE')) {
                    return (
                        <Card
                            key={reservation.id}
                            border={(moment(reservation.startTime).isAfter(moment(), 'hour')) ? "success" : "danger"}
                            style={{ marginBottom: 10 }}
                        >
                            <Card.Header style={{ alignItems: 'center' }}>
                            <b>{moment(reservation.startTime).format('hh:mm A')} - {moment(reservation.endTime).format('hh:mm A')}</b>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'flex-start',
                                }}>                                    
                                    <Badge pill bg={bookingTypeColor} style={{marginTop:5, marginRight:5}}>
                                        {reservation.bookingType}
                                    </Badge>
                                    <Badge pill bg="secondary" style={{marginTop:5, marginRight:5}}>
                                        {reservation.status}
                                    </Badge>                                  
                                </div>

                            </Card.Header>
                            <Card.Body>
                                <Card.Text>{reservation.user.email}</Card.Text>

                            </Card.Body>
                            <ButtonBootstrap variant="text" color="#ff0000" onClick={() => {
                                onCreate(reservation)
                            }}>
                                Eliminar reserva
                                <DeleteIcon />
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
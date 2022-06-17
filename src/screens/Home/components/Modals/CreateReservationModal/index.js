import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ButtonBootstrap from 'react-bootstrap/Button'
import { dateToString } from '../../../../../utils/dateParsers';
import moment from 'moment';

const ReserveModal = ({ show, onHide, plate, users, onCreate }) => {
    const [day, setDay] = useState(moment().format('YYYY-MM-DD'));
    const [time, setTime] = useState(moment().startOf('hour').format('hh:mm'));
    const [mail, setMail] = useState("");

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header >
                <Modal.Title>Asignar reserva a operario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h6>Auto: {plate}</h6>
                <Form>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                    >
                        <Form.Label>Elegir dia</Form.Label>
                        <Form.Control
                            type="date"
                            min={dateToString(new Date())}
                            defaultValue={day}
                            onChange={value => { setDay(value.target.value) }}
                            autoFocus
                        />
                        <Form.Label>Elegir horario</Form.Label>
                        <Form.Control
                            type="time"
                            defaultValue={time}
                            onChange={value => { setTime(value.target.value) }}
                            autoFocus
                        />
                        <Form.Label>Elegir operario</Form.Label>
                        <Form.Select
                            aria-label="Default select example"
                            onChange={value => { setMail(value.target.value) }}
                        >
                            <option value="">Seleccionar operario</option>
                            {users.map((user) => (<option value={user.value}>{user.label}</option>))}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <ButtonBootstrap
                    variant="secondary"
                    onClick={() => {
                        onHide();
                    }
                    }
                >
                    Cerrar
                </ButtonBootstrap>
                <ButtonBootstrap
                    variant="primary"
                    onClick={() => {
                        onCreate(plate, mail, day, time)
                    }
                    }
                >
                    Asignar reserva
                </ButtonBootstrap>
            </Modal.Footer>
        </Modal>
    )
}

export default ReserveModal;
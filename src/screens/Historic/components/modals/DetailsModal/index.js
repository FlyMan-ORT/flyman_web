import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import StarRateIcon from '@mui/icons-material/StarRate';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ReportIcon from '@mui/icons-material/Report';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const DetailsModal = ({ show, onHide, service }) => {
    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton style={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Modal.Title>Detalles del servicio</Modal.Title>

            </Modal.Header>
            <Modal.Body>

                <div style={{
                    alignItems: 'center', display: 'flex',
                    flexDirection: 'column'
                }}>
                    <img src={service.carImage} style={{ height: 150 }} alt="carImage"/>
                    <h6 style={{ marginBottom: 10 }}>{service.plate}</h6>
                    <h6 style={{ marginBottom: 30 }}>{service.userEmail}</h6>
                    <h6>Limpieza al iniciar servicio</h6>
                    <div style={{
                        alignItems: 'center', display: 'flex',
                        flexDirection: 'row', marginBottom: 30
                    }}>
                        <StarRateIcon color='primary'></StarRateIcon>
                        <StarRateIcon color={service.cleanliness > 1 ? 'primary' : 'disabled'}></StarRateIcon>
                        <StarRateIcon color={service.cleanliness > 2 ? 'primary' : 'disabled'}></StarRateIcon>
                        <StarRateIcon color={service.cleanliness > 3 ? 'primary' : 'disabled'}></StarRateIcon>
                        <StarRateIcon color={service.cleanliness > 4 ? 'primary' : 'disabled'}></StarRateIcon>
                    </div>
                </div>


                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '30%'
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            paddingRight: 20
                        }}>
                            <h6>Servicio de limpieza</h6>
                            <div style={{ marginLeft: 'auto' }}>
                                {service.cleanTask ? <CheckBoxIcon color='success'></CheckBoxIcon> : <HighlightOffIcon color='error'></HighlightOffIcon>}
                            </div>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            paddingRight: 20
                        }}>
                            <h6>Inflado de neumaticos</h6>
                            <div style={{ marginLeft: 'auto' }}>
                                {service.inflateTireTask ? <CheckBoxIcon color='success'></CheckBoxIcon> : <HighlightOffIcon color='error'></HighlightOffIcon>}
                            </div>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            paddingRight: 20
                        }}>
                            <h6>Reposicion de lamparita</h6>
                            <div style={{ marginLeft: 'auto' }}>
                                {service.lampFixTask ? <CheckBoxIcon color='success'></CheckBoxIcon> : <HighlightOffIcon color='error'></HighlightOffIcon>}
                            </div>
                        </div>
                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '30%',
                        paddingRight: 10
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            paddingRight: 30
                        }}>
                            <h6>Documentos</h6>
                            <div style={{ marginLeft: 'auto' }}>
                                {service.documents ? <CheckBoxIcon color='success'></CheckBoxIcon> : <HighlightOffIcon color='error'></HighlightOffIcon>}
                            </div>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            paddingRight: 30
                        }}>
                            <h6>Rueda de auxilio</h6>
                            <div style={{ marginLeft: 'auto' }}>
                                {service.tires ? <CheckBoxIcon color='success'></CheckBoxIcon> : <HighlightOffIcon color='error'></HighlightOffIcon>}
                            </div>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            paddingRight: 30
                        }}>
                            <h6>Kit de seguridad</h6>
                            <div style={{ marginLeft: 'auto' }}>
                                {service.securityKit ? <CheckBoxIcon color='success'></CheckBoxIcon> : <HighlightOffIcon color='error'></HighlightOffIcon>}
                            </div>
                        </div>
                    </div>


                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '30%',
                        paddingRight: 10
                    }}>
                        {
                            service.isDamaged ?
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'flex-start',
                                    paddingRight: 20
                                }}>
                                    <h6 style={{ color: 'red' }}> DAÑO REPORTADO</h6>
                                    <div style={{ marginLeft: 'auto' }}>
                                        <ReportIcon color='error'></ReportIcon>
                                    </div>
                                </div>
                                :
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'flex-start',
                                    paddingRight: 20
                                }}>
                                    <h6> Sin Reporte de daño</h6>
                                    <div style={{ marginLeft: 'auto' }}>
                                        <CheckCircleIcon color='primary'></CheckCircleIcon>
                                    </div>
                                </div>
                        }
                        {
                            service.damageDescription === "" ?
                                <p></p>
                                :
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    paddingRight: 20
                                }}>
                                    <Card className="text-center">
                                        <Card.Text>{service.damageDescription}
                                        </Card.Text>
                                    </Card>
                                </div>
                        }
                    </div>
                </div>
                {/* div final */}

                <div style={{
                    alignItems: 'center', display: 'flex',
                    flexDirection: 'column', paddingTop: 30
                }}>
                    {
                        service.fuelLoad ?
                            <div style={{
                                alignItems: 'center', display: 'flex',
                                flexDirection: 'column'
                            }}>

                                <h6>Se cargó combustible: <MonetizationOnIcon color='success'></MonetizationOnIcon><b>{service.fuelPrice}</b></h6>
                            </div>
                            :
                            null
                    }
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default DetailsModal;
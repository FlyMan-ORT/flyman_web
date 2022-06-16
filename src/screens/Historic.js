import { useEffect, useState } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import Modal from 'react-bootstrap/Modal';
import { getAllServices } from '../api/services';
import LinearProgress from '@mui/material/LinearProgress';
import moment from 'moment';

import AssignmentIcon from '@mui/icons-material/Assignment';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import StarRateIcon from '@mui/icons-material/StarRate';
import ReportIcon from '@mui/icons-material/Report';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Card from 'react-bootstrap/Card'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';


const divContainerStyle = {
  height: 800,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: 20,
  paddingRight: 50,
};

function Historic() {

  const [services, setServices] = useState([]);
  const [detailsModalShow, setDetailsModalShow] = useState(false)
  const [noDataModalShow, setNoDataModalShow] = useState(false);
  const [serviceDetails, setServiceDetails] = useState([]);
  const handleClose = () => setDetailsModalShow(false);
  const [process, setProcess] = useState(true);


  const columns = [
    {
      headerName: 'Detalle',
      field: 'actions',
      type: 'actions',
      width: '70',

      getActions: (params) => [
        <GridActionsCellItem icon={<AssignmentIcon />} onClick={() => {
          if (params.row.hasOwnProperty('cleanTask')) {
            setServiceDetails(params.row)
            setDetailsModalShow(true)
          } else {
            setNoDataModalShow(true)
          }
        }
        }
          label="Print" />,
      ]
    },
    {
      field: 'userEmail', headerName: 'Operario',
      sortable: false,
      width: 250,
      valueGetter: (params) =>
        `${params.row.userEmail}`,
    },
    {
      headerName: 'Carga',
      field: 'fuelLoad',
      width: 60,
      align: 'center',
      renderCell: (params) => {
        if (params.row.fuelLoad) {
          return (<MonetizationOnIcon color='success'></MonetizationOnIcon>)
        } else {
          return (<p>-</p>)
        }
      }
    },
    {
      headerName: 'Daño',
      field: 'isDamaged',
      width: 60,
      align: 'center',
      renderCell: (params) => {
        if (params.row.isDamaged) {
          return (<BuildCircleIcon color='error'></BuildCircleIcon>)
        }
        else {
          return (<p>-</p>)
        }
      }
    },
    { field: 'id', headerName: 'ID', width: 70, hide: true },
    { field: 'plate', headerName: 'Patente', width: 100 },
    { field: 'startDate', headerName: 'Inicio', width: 170 },
    { field: 'endDate', headerName: 'Fin', width: 170 },

  ]

  useEffect(() => {
    async function fetchData() {
      try {
        setProcess(true);
        const servicesResponse = await getAllServices();
        const servicesForTable = servicesResponse.map((service) => {
          if (!service.hasOwnProperty('tasks')) {
            return {
              id: service._id,
              reservationId: service.reservationId,
              startDate: moment(service.startDate).format('DD/MM/YYYY hh:mm [hs]'),
              endDate: service.endDate ? moment(service.endDate).format('DD/MM/YYYY hh:mm [hs]') : "",
              plate: service.plate,
              userEmail: service.userEmail,
            }
          } else return {
            id: service._id,
            plate: service.plate,
            reservationId: service.reservationId,
            userEmail: service.userEmail,
            startDate: moment(service.startDate).format('DD/MM/YYYY hh:mm [hs]'),
            endDate: moment(service.endDate).format('DD/MM/YYYY hh:mm [hs]'),
            cleanliness: service.cleanliness,
            carImage: service.carImage,
            cleanTask: service.tasks[0].cleanTask,
            inflateTireTask: service.tasks[0].inflateTireTask,
            lampFixTask: service.tasks[0].lampFixTask,
            documents: service.documents,
            securityKit: service.securityKit,
            tires: service.tires,
            isDamaged: service.damage.isDamaged,
            damageDescription: service.damage.damageDescription,
            fuelLoad: service.fuel.fuelLoad,
            fuelPrice: service.fuel.fuelPrice

          }
        })
        setServices(servicesForTable);
        setProcess(false);
      } catch (error) {
      }
    }
    fetchData();
  }, [])

  return (
    <div style={divContainerStyle}>
      <DataGrid
        rows={services}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
        components={{
          LoadingOverlay: LinearProgress,
        }}
        loading={process}
        {...services}
      />
      <Modal show={detailsModalShow} onHide={handleClose} size="lg">
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
            <img src={serviceDetails.carImage} style={{ height: 150 }}></img>
            <h7 style={{ marginBottom: 10 }}>{serviceDetails.plate}</h7>
            <h6 style={{ marginBottom: 30 }}>{serviceDetails.userEmail}</h6>
            <h6>Limpieza al iniciar servicio</h6>
            <div style={{
              alignItems: 'center', display: 'flex',
              flexDirection: 'row', marginBottom: 30
            }}>
              <StarRateIcon color='primary'></StarRateIcon>
              <StarRateIcon color={serviceDetails.cleanliness > 1 ? 'primary' : 'disabled'}></StarRateIcon>
              <StarRateIcon color={serviceDetails.cleanliness > 2 ? 'primary' : 'disabled'}></StarRateIcon>
              <StarRateIcon color={serviceDetails.cleanliness > 3 ? 'primary' : 'disabled'}></StarRateIcon>
              <StarRateIcon color={serviceDetails.cleanliness > 4 ? 'primary' : 'disabled'}></StarRateIcon>
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
                  {serviceDetails.cleanTask ? <CheckBoxIcon color='success'></CheckBoxIcon> : <HighlightOffIcon color='error'></HighlightOffIcon>}
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
                  {serviceDetails.inflateTireTask ? <CheckBoxIcon color='success'></CheckBoxIcon> : <HighlightOffIcon color='error'></HighlightOffIcon>}
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
                  {serviceDetails.lampFixTask ? <CheckBoxIcon color='success'></CheckBoxIcon> : <HighlightOffIcon color='error'></HighlightOffIcon>}
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
                  {serviceDetails.documents ? <CheckBoxIcon color='success'></CheckBoxIcon> : <HighlightOffIcon color='error'></HighlightOffIcon>}
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
                  {serviceDetails.tires ? <CheckBoxIcon color='success'></CheckBoxIcon> : <HighlightOffIcon color='error'></HighlightOffIcon>}
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
                  {serviceDetails.securityKit ? <CheckBoxIcon color='success'></CheckBoxIcon> : <HighlightOffIcon color='error'></HighlightOffIcon>}
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
                serviceDetails.isDamaged ?
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
                serviceDetails.damageDescription === "" ?
                  <p></p>
                  :
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    paddingRight: 20
                  }}>
                    <Card className="text-center">
                      <Card.Text>{serviceDetails.damageDescription}
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
              serviceDetails.fuelLoad ?
                <div style={{
                  alignItems: 'center', display: 'flex',
                  flexDirection: 'column'
                }}>

                  <h6>Se cargó combustible: <MonetizationOnIcon color='success'></MonetizationOnIcon><b>{serviceDetails.fuelPrice}</b></h6>
                </div>
                :
                null
            }


          </div>


        </Modal.Body>
      </Modal>

      <Modal size="sm" show={noDataModalShow} onHide={() => setNoDataModalShow(false)} aria-labelledby="example-modal-sizes-title-sm" style={{ textAlignL: 'center' }}>
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
    </div >
  );
}

export default Historic;
import { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import LocalCarWashIcon from '@mui/icons-material/LocalCarWash';
import Modal from 'react-bootstrap/Modal';
import { BASE_URL } from '../utils/connections';

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
  const [serviceTasks, setServicesTasks] = useState([]);
  const handleClose = () => setDetailsModalShow(false);


  const columns = [
    {
      headerName: 'Detalle',
      field: 'actions',
      type: 'actions',
      width: '70',

      getActions: (params) => [
        <GridActionsCellItem icon={<LocalCarWashIcon/>} onClick={() => {
          setServicesTasks(params.row.tasks)          
          setDetailsModalShow(true)
        }
        }
          label="Print" />,
      ]
    },
    {
      field: 'userEmail', headerName: 'Operario',
      sortable: false,
      width: 280,
      valueGetter: (params) =>
        `${params.row.userEmail}`,
    },
    { field: 'id', headerName: 'ID', width: 70, hide: true },
    { field: 'plate', headerName: 'Patente', width: 100 },
    { field: 'reservationId', headerName: 'Reserva', width: 150 },
    { field: 'startDate', headerName: 'Inicio', width: 170 },
    { field: 'endDate', headerName: 'Fin', width: 170 },

  ]

  useEffect(() => {
    async function fetchData() {
      // TODO: sacar URL hardcodeada.
      const servicesResponse = (await axios.get(`${BASE_URL}/services/`)).data;

      const servicesForTable = servicesResponse.map((service) => {
        return {
          id: service._id,
          plate: service.plate,
          reservationId: service.reservationId,
          userEmail: service.userEmail,
          startDate: (new Date(service.startDate)).toLocaleString('en-GB', { timeZone: 'UTC' }),
          endDate: (service.endDate ? (new Date(service.endDate)).toLocaleString('en-GB', { timeZone: 'UTC' }) : ""),
          tasks:(service.tasks) ? service.tasks : []
        }
      })      
      setServices(servicesForTable);
    }
    fetchData();

  }, [])

  return (
    <div style={divContainerStyle}>
      <DataGrid
        rows={services}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
      />
      <Modal show={detailsModalShow} onHide={handleClose} size="sm">
        <Modal.Header closeButton>
          <Modal.Title>Detalles del servicio</Modal.Title>
        </Modal.Header>
        <Modal.Body>{serviceTasks.map(e => {return(<p>{e}</p>)})}</Modal.Body>
      </Modal>
    </div>
  );
}

export default Historic;
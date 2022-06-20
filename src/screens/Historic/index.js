import moment from 'moment';
import { useEffect, useState } from 'react';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import { getAllServices } from '../../api/services';
import NoDataModal from './components/modals/NoDataModal';
import DetailsModal from './components/modals/DetailsModal';

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
  const [showNoDataModal, setShowNoDataModal] = useState(false);
  const [serviceDetails, setServiceDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const onOpenNoDataModal = () => {
    setShowNoDataModal(true);
  }

  const onHideNoDataModal = () => {
    setShowNoDataModal(false);
  }

  const onOpenDetailsModal = (service) => {
    setServiceDetails(service);
    setDetailsModalShow(true);
  }

  const onHideDetailsModal = () => {
    setDetailsModalShow(false);
    setServiceDetails({});
  }

  const columns = [
    {
      headerName: 'Detalle',
      field: 'actions',
      type: 'actions',
      width: '70',

      getActions: (params) => [
        <GridActionsCellItem icon={<AssignmentIcon />} onClick={() => {
          if (params.row.hasOwnProperty('cleanTask')) {
            onOpenDetailsModal(params.row);
          } else {
            onOpenNoDataModal();
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
        setLoading(true);
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
        setLoading(false);
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
          Toolbar: GridToolbar,
        }}
        loading={loading}
        {...services}
      />

      <DetailsModal
        show={detailsModalShow}
        onHide={onHideDetailsModal}
        service={serviceDetails}
      />

      <NoDataModal
        show={showNoDataModal}
        onHide={onHideNoDataModal}
      />

    </div >
  );
}

export default Historic;
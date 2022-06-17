import { useEffect, useState, forwardRef } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ButtonBootstrap from 'react-bootstrap/Button'
import { getMaintenanceUsers } from '../api/users';
import { getAllReservations, createReserve } from '../api/reservations';
import { getAllCars } from '../api/cars';
import moment from 'moment';
import Badge from 'react-bootstrap/Badge'
import { datesAscending } from '../utils/sorting'
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import MapModal from './Home/components/Modals/MapModal';
import ReservationsModal from './Home/components/Modals/ReservationsModal';
import CreateReservationModal from './Home/components/Modals/CreateReservationModal';


const divContainerStyle = {
  height: 800,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: 20,
  paddingRight: 50,
};

function Home() {
  const [cars, setCars] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [carsWithReservationFirst, setCarsWithReservationFirst] = useState([]);
  const [selectedCarReservations, setSelectedCarReservations] = useState([])
  const [showReservationsModal, setShowReservationsModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [carPosition, setCarPosition] = useState({ latitude: 0, longitude: 0 });
  const [showCreateReservationModal, setShowCreateReservationModal] = useState(false);
  const [maintenanceUsers, setMaintenanceUsers] = useState([]);
  const [carForReservation, setCarForReservation] = useState({});
  const [openSnackError, setOpenSnackError] = useState(false);
  const [openSnackSuccess, setOpenSnackSuccess] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [updateFlag, setUpdateFlag] = useState(false);

  const handleClick = () => {
    setOpenSnackError(false);
    setOpenSnackSuccess(false)
  };
  const [process, setProcess] = useState(true);

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const onHideMapModal = () => {
    setShowMapModal(false);
    setCarPosition({ latitude: 0, longitude: 0 });
  }

  const onOpenMapModal = (car) => {
    setCarPosition(car.position);
    setShowMapModal(true);
  }

  const onHideReservationsModal = () => setShowReservationsModal(false);

  const onHideCreateReservationModal = () => {
    setShowCreateReservationModal(false);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setProcess(true);
        const carsResponse = await getAllCars();
        setCars(carsResponse);
        const reservantionResponse = await getAllReservations();
        setReservations(reservantionResponse)
        const fetchMaintenanceUsers = await getMaintenanceUsers();
        const valuesMaintananceUser = fetchMaintenanceUsers.map((m) => { return { value: m.email, label: m.name } })
        setMaintenanceUsers(valuesMaintananceUser)
        setProcess(false);
      } catch (error) {
        setSnackMessage(error.message);
        setOpenSnackError(true);
      }
    }
    fetchData();
  }, [updateFlag])

  async function createReservation(plate, mail, day, time) {
    console.log(plate, mail, day, time);
    try {
      const reservation = { plate, mail, day, time };
      await createReserve(reservation);
      setShowCreateReservationModal(false);
      setSnackMessage('Reserva creada!');
      setOpenSnackSuccess(true);
      setUpdateFlag(!updateFlag)
    } catch (error) {
      setSnackMessage(error.message);
      setOpenSnackError(true);
    }
  };

  useEffect(() => {
    setProcess(true);
    //separo las reservas del dia y las ordeno
    let filteredReservations = reservations.filter(r => (moment().isSame(moment(r.startTime), 'day'))).sort(datesAscending)

    //creo el array donde iran los autos que sean de una reserva de hoy
    let filteredCars = []

    //filtro y por la primera reserva (la mas temprana del dia) agrego al auto al array

    filteredReservations.forEach((r) => {
      const car = cars.find(c => r.car.plate == c.plate)
      if (car !== undefined && !filteredCars.some(c => c.plate == car.plate)) {
        filteredCars.push(car)
      }
    })

    //separo el resto de los autos sacando los que tenian reserva
    let restOfcars = cars.filter((c) => {
      return !filteredCars.includes(c)
    })

    //integro los dos array quedando los que tienen reserva al principio y agregando los otros detrás    
    filteredCars.push(...restOfcars)

    //lo mapeo para la tabla
    const carsForTable = filteredCars.map((car) => {
      return {
        id: car._id,
        plate: car.plate,
        description: car.name,
        fuelLevel: car.fuelLevel,
        fuelType: car.fuelType,
        parkingName: car.parkingName,
        idParkingSlot: car.idParkingSlot,
        lastModifiedDate: car.lastModifiedDate,
        position: car.position ? { latitude: car.position.latitude, longitude: car.position.longitude } : { latitude: 0, longitude: 0 },
        battery: car.battery,
        nextReservation: 'nextReservation'

      }
    })
    setCarsWithReservationFirst(carsForTable);
    setProcess(false);

  }, [cars, reservations])

  const columns = [
    {
      headerName: 'Reservas',
      field: 'header',
      renderCell: (params) => {
        const dayReservations = reservations.filter(r => r.car.plate == params.row.plate).filter(r => (moment().isSame(moment(r.startTime), 'day')))
        return (
          <ButtonBootstrap variant="outline-secondary" onClick={() => {
            setSelectedCarReservations(reservations.filter(r => r.car.plate === params.row.plate)
              .sort(datesAscending))
            setShowReservationsModal(true)
          }}>
            Ver <Badge bg="dark">{dayReservations.length}</Badge>
            <span className="visually-hidden"></span>
          </ButtonBootstrap>
        )
      }
    },
    {
      headerName: 'Proxima',
      field: 'nextReservation',
      renderCell: (params) => {
        const nextReservation = reservations.filter(r => r.car.plate == params.row.plate)
          .filter(r => moment().isSame(moment(r.startTime), 'day'))
          .filter(r => moment(r.startTime).isAfter(moment(), 'hour'))
          .sort(datesAscending)

        return (
          <p>{nextReservation.length > 0 ? moment(nextReservation[0].startTime).format('hh:mm A') : '-'}</p>
        )
      }
    },
    {
      headerName: 'Asignar',
      field: 'Asignar',
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem icon={<AssignmentIndIcon fontSize='large' label='Asignar' />}
          onClick={() => {
            setCarForReservation(cars.find(car => car.plate === params.row.plate))
            setShowCreateReservationModal(true)
          }
          }
          label="Asignar"
        />
      ]
    },
    {
      headerName: 'Mapa',
      field: 'map',
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem icon={<LocationOnIcon fontSize='large' />}
          onClick={() => onOpenMapModal(params.row)}
          label="Mapa"
        />
      ]
    },
    { field: 'id', headerName: 'ID', width: 70, hide: true },
    {
      field: 'plate', headerName: 'Patente', width: 120,
      sortable: false,
      valueGetter: (params) => `${params.row.plate}`,
    },
    {
      field: 'fuelLevel',
      headerName: 'Combustible',
      width: 130,
      align: 'center',
      cellClassName: (params) => {
        if (params.row.fuelLevel < 25) return 'red';
        if (params.row.fuelLevel < 50 && params.row.fuelLevel >= 25) return 'orange';
        if (params.row.fuelLevel < 75 && params.row.fuelLevel >= 50) return 'yellow';
        if (params.row.fuelLevel <= 100 && params.row.fuelLevel >= 75) return 'green';
      }
    },
    {
      field: 'battery',
      headerName: 'Batería',
      width: 130,
      align: 'center',
      cellClassName: (params) => {
        if (params.row.battery < 12) return 'red';
        if (params.row.battery < 12.1 && params.row.battery >= 12) return 'orange';
        if (params.row.battery < 12.3 && params.row.battery >= 12.1) return 'yellow';
        if (params.row.battery >= 12.3) return 'green';
      }
    },
    { field: 'description', headerName: 'Modelo', width: 130 },
    { field: 'fuelType', headerName: 'Combustible', width: 130 },
    { field: 'parkingName', headerName: 'Estacionamiento', width: 180 },
    { field: 'idParkingSlot', headerName: 'Ubicacion', width: 80 },
  ]



  return (
    <div style={divContainerStyle}>
      <Box
        sx={{
          height: '100%',
          width: 1500,
          '& .green': {
            backgroundColor: '#66ff99',
            color: '#1a3e72',
            fontWeight: '600',
          },
          '& .red': {
            backgroundColor: '#ff4d4d',
            color: '#1a3e72',
            fontWeight: '600',
          },
          '& .orange': {
            backgroundColor: '#ffc266',
            color: '#1a3e72',
            fontWeight: '600',
          },
          '& .yellow': {
            backgroundColor: '#ffff80',
            color: '#1a3e72',
            fontWeight: '600',
          },
        }}
      >
        <DataGrid
          rows={carsWithReservationFirst}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[20]}
          components={{
            LoadingOverlay: LinearProgress,
          }}
          loading={process}
          {...reservations}
        />
      </Box>

      <ReservationsModal
        show={showReservationsModal}
        onHide={onHideReservationsModal}
        reservations={selectedCarReservations}
      />

      <MapModal
        show={showMapModal}
        onHide={onHideMapModal}
        position={carPosition}
      />

      <CreateReservationModal
        show={showCreateReservationModal}
        onHide={onHideCreateReservationModal}
        plate={carForReservation.plate}
        users={maintenanceUsers}
        onCreate={(plate, mail, day, time) => createReservation(plate, mail, day, time)}
      />

      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={openSnackError} autoHideDuration={6000} onClose={handleClick}>
        <Alert onClose={handleClick} severity="error" sx={{ width: '100%' }}>
          {snackMessage}
        </Alert>
      </Snackbar>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={openSnackSuccess} autoHideDuration={6000} onClose={handleClick}>
        <Alert onClose={handleClick} severity="success" sx={{ width: '100%' }}>
          {snackMessage}
        </Alert>
      </Snackbar>
      {/* <SnackBarFlyMan severity={'error'} message={snackMessage} open={openSnackError} handleClick={handleClick} /> */}
    </div>
  );
}


export default Home;
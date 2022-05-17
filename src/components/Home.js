import axios from 'axios';
import { useEffect, useState } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Modal from 'react-bootstrap/Modal';

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
  const [reservationsModalShow, setReservationsModalShow] = useState(false)
  const [selectedCarReservations, setSelectedCarReservations] = useState([])
  const handleClose = () => setReservationsModalShow(false);

  useEffect(() => {
    console.log('use effect');
    async function fetchData() {
      // TODO: sacar URL hardcodeada.
      const carsResponse = await axios.get('http://192.168.0.140:3000/cars/');
      setCars(carsResponse.data);

      const reservantionResponse = await axios.get('http://192.168.0.140:3000/reservations/');
      setReservations(reservantionResponse.data)

    }
    fetchData();
  }, [])

  useEffect(() => {
    //separo los autos con reserva
    let filteredCars = cars.filter((c) => {
      return reservations.some((r) => {
        return r.car.plate == c.plate;
      });
    });

    //separo el resto de los autos sacando los que tenian reserva
    let restOfcars = cars.filter((c) => {
      return !filteredCars.includes(c)
    })

    //junto los dos array quedando los que tienen reserva al principio y agregando los otros detrás
    //TODO: ordenar previamente los reservados por fecha más próxima
    filteredCars.push(...restOfcars)

    //lo mapeo para la tabla
    const carsForTable = filteredCars.map((car) => {
      return {
        id: car._id,
        plate: car.plate,
        description: car.description,
        fuelLevel: car.fuelLevel,
        fuelType: car.fuelType,
        parkingName: car.parkingName,
        idParkingSlot: car.idParkingSlot,
        lastModifiedDate: car.lastModifiedDate,
        reservations: reservations.filter(r => r.car.plate === car.plate)
      }
    })
    console.log(carsForTable)
    setCarsWithReservationFirst(carsForTable);
  }, [cars])

  const columns = [
    {
      headerName: 'Reservas',
      field: 'reservations',
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem icon={<FormatListBulletedIcon fontSize='large' />}
          onClick={() => {
            setSelectedCarReservations(params.row.reservations)
            setReservationsModalShow(true)

          }
          }
          label="Delete" />
      ]
    },
    {
      headerName: 'Asignar',
      field: 'actions',
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem icon={<AssignmentIndIcon fontSize='large' />} onClick={() => alert('' + params.row.plate + ' asignado a Pepelui')} label="Delete" />
      ]
    },
    { field: 'id', headerName: 'ID', width: 70, hide: true },
    {
      field: 'plate', headerName: 'Patente', width: 120,
      sortable: false,
      valueGetter: (params) => `${params.row.plate}`,
    },
    { field: 'description', headerName: 'Modelo', width: 300 },
    { field: 'fuelLevel', headerName: 'Combustible', width: 130 },
    { field: 'fuelType', headerName: 'Tipo de combustible', width: 130 },
    { field: 'parkingName', headerName: 'Estacionamiento', width: 300 },
    { field: 'idParkingSlot', headerName: 'Ubicacion', width: 130 },
  ]



  return (
    <div style={divContainerStyle}>
      <DataGrid
        rows={carsWithReservationFirst}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
      />
      <Modal show={reservationsModalShow} onHide={handleClose} size="sm">
        <Modal.Header closeButton>
          <Modal.Title>Reservas del dia</Modal.Title>
        </Modal.Header>
        <Modal.Body>{selectedCarReservations.map(e => {
          return (
            <div>
              <p>Inicio: {new Date(e.startTime).getHours()}:{new Date(e.startTime).getMinutes()} - Fin {new Date(e.endTime).getHours()}:{new Date(e.endTime).getMinutes()}</p>
            </div>
        )})}
        </Modal.Body>
      </Modal>
    </div>
  );
}


export default Home;
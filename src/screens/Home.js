import axios from 'axios';
import { useEffect, useLayoutEffect, useState } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ButtonBootstrap from 'react-bootstrap/Button'
import { getMaintenanceUsers } from '../api/users';
import { BASE_URL } from '../utils/connections';
import { dateToString } from '../utils/dateParsers';

const divContainerStyle = {
  height: 800,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: 20,
  paddingRight: 50,
};

const mapModalStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center'
}

function Home() {
  const [cars, setCars] = useState([]);
  const [reservations, setReservations] = useState([]);  
  const [carsWithReservationFirst, setCarsWithReservationFirst] = useState([]);  
  const [selectedCarReservations, setSelectedCarReservations] = useState([])  
  const [reservationsModalShow, setReservationsModalShow] = useState(false)
  const [mapViewModalShow, setMapViewModalShow] = useState(false)
  const [carForMapView, setCarForMapView] = useState({ position: { latitude: 0, longitude: 0 } })
  const [sourceForMap, setSourceForMap] = useState('')
  const [createReserveModalShow, setCreateReserveModalShow] = useState(false)
  const [maintenanceUsers, setMaintenanceUsers] = useState([])
  const [reservationSelectedDay, setDiaReserva] = useState(dateToString(new Date()))  
  const [reservationSelectedTime, setHoraReserva] = useState("08:00")  
  const [reservationSelectedEmployee, setMailDeOperario] = useState("")  
  const [carForReservation, setCarForReservation] = useState({})  
  const handleCloseReservationModal = () => setReservationsModalShow(false);
  const handleCloseMapViewModal = () => setMapViewModalShow(false);
  const handleCloseCreateReserveModal = () => setCreateReserveModalShow(false);

  async function createReservation(car, employeeMail,reservationDay,reservationTime) {
    const reservation = {car, employeeMail,reservationDay,reservationTime}    
    await axios.post(`${BASE_URL}/reservations/`, reservation)
    
  }

  useEffect(() => {
    async function fetchData() {

      const carsResponse = await axios.get(`${BASE_URL}/cars/`);
      setCars(carsResponse.data);

      const reservantionResponse = await axios.get(`${BASE_URL}/reservations/`);
      setReservations(reservantionResponse.data)

      const fetchMaintenanceUsers = await getMaintenanceUsers();
      const valuesMaintananceUser = fetchMaintenanceUsers.map((m) => { return { value: m.email, label: m.name } })
      setMaintenanceUsers(valuesMaintananceUser)


    }
    fetchData();
  }, [])

  useEffect(() => {

    setSourceForMap('<iframe width = "800" height = "650" style = "border:0" loading = "lazy" allowfullscreen referrerpolicy = "no-referrer-when-downgrade" src = "https://maps.google.com/maps?q=' + carForMapView.position.latitude + ',' + carForMapView.position.longitude + '&hl=es&z=14&amp;output=embed"></iframe >')
  }, [mapViewModalShow])

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
        position: car.position ? { latitude: car.position.latitude, longitude: car.position.longitude } : { latitude: 0, longitude: 0 }
      }
    })
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
            setSelectedCarReservations(reservations.filter(r => r.car.plate === params.row.plate))                
            setReservationsModalShow(true)
          }
          }
          label="Delete" />
      ]
    },
    {
      headerName: 'Asignar',
      field: 'Asignar',
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem icon={<AssignmentIndIcon fontSize='large' />} 
        onClick={() => {
          setCarForReservation(cars.find(car => car.plate === params.row.plate))
          setCreateReserveModalShow(true)
        }
        } 
        />
      ]
    },
    {
      headerName: 'Ver en mapa',
      field: 'map',
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem icon={<LocationOnIcon fontSize='large' />}
          onClick={async () => {            
            setCarForMapView(params.row)
            setMapViewModalShow(true)
          }
          }
          label="Delete" />
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
      <Modal show={reservationsModalShow} onHide={handleCloseReservationModal} size="sm">
        <Modal.Header closeButton>
          <Modal.Title>Reservas del dia</Modal.Title>
        </Modal.Header>
        <Modal.Body>{selectedCarReservations.map(e => {
          return (
            <div>
              <p>Inicio: {new Date(e.startTime).getHours()}:{new Date(e.startTime).getMinutes()} - Fin {new Date(e.endTime).getHours()}:{new Date(e.endTime).getMinutes()}</p>
            </div>
          )
        })}
        </Modal.Body>
      </Modal>

      <Modal show={mapViewModalShow} onHide={handleCloseMapViewModal} size={'xl'}  >
        <Modal.Header closeButton>
          <Modal.Title>Vista de mapa</Modal.Title>
        </Modal.Header>
        <Modal.Body style={mapModalStyle}>
          <div dangerouslySetInnerHTML={{ __html: sourceForMap }}></div>
        </Modal.Body>

      </Modal>
      <Modal show={createReserveModalShow} onHide={handleCloseCreateReserveModal}>
        <Modal.Header >
          <Modal.Title>Asignar reserva a operario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Elegir dia</Form.Label>
              <Form.Control
                type="date"
                min={dateToString(new Date())}
                defaultValue={reservationSelectedDay}
                onChange={e => {setDiaReserva(e.target.value)}}
                autoFocus                
              />
              <Form.Label>Elegir horario</Form.Label>
              <Form.Control
                type="time"
                defaultValue="08:00"
                onChange={e => { setHoraReserva(e.target.value)}}
                autoFocus
              />
              <Form.Label>Elegir operario</Form.Label>
              <Form.Select 
                aria-label="Default select example"
                onChange={e => { setMailDeOperario(e.target.value)}}
              >
                {maintenanceUsers.map((m) => (
                  <option value={m.value}>{m.label}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <ButtonBootstrap variant="secondary" onClick={() => { 
            setCreateReserveModalShow(false)
            setDiaReserva(dateToString(new Date()))
            setHoraReserva("08:00")
            setMailDeOperario("") 
            }
            }>Cerrar
          </ButtonBootstrap>
          <ButtonBootstrap variant="primary" onClick={() => {
            createReservation(carForReservation, reservationSelectedEmployee, reservationSelectedDay, reservationSelectedTime)
            setCreateReserveModalShow(false)
            setDiaReserva(dateToString(new Date()))
            setHoraReserva("08:00")
            setMailDeOperario("")
          }
          }>Asignar reserva
          </ButtonBootstrap>
        </Modal.Footer>
      </Modal>
    </div>
  );
}


export default Home;
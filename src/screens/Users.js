import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from 'react-bootstrap/Modal';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Form from 'react-bootstrap/Form';
import ButtonBootstrap from 'react-bootstrap/Button'
import { BASE_URL } from '../utils/connections';

const divContainerStyle = {
  height: 800,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: 20,
  paddingRight: 50,
};

function Users() {
  const [editModalShow, setEditModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [newUserModalShow, setNewUserModalShow] = useState(false);
  const [users, setUsers] = useState([]);
  const [reserves, setReserves] = useState([]);
  const [userForEditOrDeletion, setUserForEditOrDeletion] = useState('');
  const [updateFlag, setUpdateFlag] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '', password: '' });
  const [assigmentsModalShow, setAssigmentsModalShow] = useState(false);
  const [reservesByUser, setReservesByUser] = useState([]);

  async function createUser(user) {
    const createUserResponse = (await axios.post(`${BASE_URL}/users/register`, user)).data;
    setUpdateFlag(!updateFlag)
  }

  async function updateUser(userId) {
    const updateUserResponse = (await axios.patch(`${BASE_URL}/users/${userId}`, userForEditOrDeletion)).data;
    setUpdateFlag(!updateFlag)
  }

  async function deleteUser(userId) {
    const deleteResponse = (await axios.delete(`${BASE_URL}/users/${userId}`)).data;
    setUpdateFlag(!updateFlag)
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 70, hide: true },
    { field: 'name', headerName: 'Nombre', width: 300 },
    { field: 'phone', headerName: 'Telefono', width: 150 },
    {
      field: 'email', headerName: 'Email',
      sortable: false,
      width: 250,
      valueGetter: (params) =>
        `${params.row.email}`,
    },
    {
      headerName: 'Asignaciones',
      field: 'Asignaciones',
      type: 'actions',
      width: '120',
      getActions: (params) => [
        <GridActionsCellItem icon={<AssignmentIcon fontSize='large' />}
          onClick={() => {            
            setUserForEditOrDeletion(params.row);            
            setReservesByUser(reserves.filter((r)=>
              r.user.email === params.row.email &&
              r.type === 'M' &&
              new Date(r.startTime).getDate() === new Date().getDate() &&
              new Date(r.startTime).getMonth() === new Date().getMonth() &&
              new Date(r.startTime).getFullYear() === new Date().getFullYear()
              ))
            setAssigmentsModalShow(true);
          }} label="Assigment" />
      ]
    },
    {
      headerName: 'Gestion',
      field: 'actions',
      type: 'actions',
      width: '90',

      getActions: (params) => [
        <GridActionsCellItem icon={<DeleteIcon />}
          onClick={() => {
            setUserForEditOrDeletion(params.row)
            setDeleteModalShow(true)
          }
          }
          label="Delete" />,
        <GridActionsCellItem icon={<EditIcon />}
          onClick={() => {
            setUserForEditOrDeletion(params.row)
            setEditModalShow(true)
          }
          }
          label="Print" />,
      ]
    },
  ];

  useEffect(() => {
    async function fetchData() {
      const usersResponse = (await axios.get(`${BASE_URL}/users/`)).data;
      const reserves = (await axios.get(`${BASE_URL}/reservations/`)).data;

      console.log(reserves[0].id)
      console.log('day',new Date(reserves[0].startTime).getDate())
      console.log('mes',new Date(reserves[0].startTime).getMonth())
      console.log('anmio',new Date(reserves[0].startTime).getFullYear())

      const usersForTable = usersResponse.map((user) => {
        return {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone
        }
      })
      setUsers(usersForTable);
      setReserves(reserves)
    }
    fetchData();
  }, [updateFlag])

  return (
    <div style={divContainerStyle}>
      <ButtonBootstrap variant="light"
        style={{ alignSelf: 'end', marginBottom: 10, backgroundColor: '#63e1fe' }}
        onClick={() => setNewUserModalShow(true)}
      >Nuevo Usuario
      </ButtonBootstrap>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
      />
      <div>
        <Modal show={editModalShow}>
          <Modal.Header >
            <Modal.Title>Editar datos</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Nombre y apellido</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={userForEditOrDeletion.name}
                  onChange={e => setUserForEditOrDeletion({ ...userForEditOrDeletion, name: e.target.value })}
                  autoFocus
                />
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  defaultValue={userForEditOrDeletion.email}
                  onChange={e => setUserForEditOrDeletion({ ...userForEditOrDeletion, email: e.target.value })}
                  autoFocus
                />
                <Form.Label>Telefono</Form.Label>
                <Form.Control
                  type="phone"
                  defaultValue={userForEditOrDeletion.phone}
                  onChange={e => setUserForEditOrDeletion({ ...userForEditOrDeletion, phone: e.target.value })}
                  autoFocus
                />
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={e => setUserForEditOrDeletion({ ...userForEditOrDeletion, password: e.target.value })}
                  autoFocus
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <ButtonBootstrap variant="secondary" onClick={() => { setEditModalShow(false) }}>
              Cerrar
            </ButtonBootstrap>
            <ButtonBootstrap variant="primary" onClick={() => {
              updateUser(userForEditOrDeletion.id)
              setEditModalShow(false)
            }
            }>
              Guardar cambios
            </ButtonBootstrap>
          </Modal.Footer>
        </Modal>

        <Modal show={deleteModalShow} onHide={() => setDeleteModalShow(false)} animation={true}>
          <Modal.Header closeButton>
            <Modal.Title>Eliminar usuario</Modal.Title>
          </Modal.Header>
          <Modal.Body>Esta a punto de eliminar al usuario {userForEditOrDeletion.name}</Modal.Body>
          <Modal.Footer>
            <ButtonBootstrap variant="secondary" onClick={() => setDeleteModalShow(false)}>
              Cancelar
            </ButtonBootstrap>
            <ButtonBootstrap variant="danger" onClick={() => {
              deleteUser(userForEditOrDeletion.id)
              setDeleteModalShow(false)

            }
            }>
              Confirmar
            </ButtonBootstrap>
          </Modal.Footer>
        </Modal>

        <Modal show={newUserModalShow}>
          <Modal.Header >
            <Modal.Title>Alta de usuario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Nombre y apellido</Form.Label>
                <Form.Control
                  type="text"
                  onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                  autoFocus
                />
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  onChange={e => setNewUser({ ...newUser, email: e.target.value })}

                />
                <Form.Label>Telefono</Form.Label>
                <Form.Control
                  type="phone"
                  onChange={e => setNewUser({ ...newUser, phone: e.target.value })}

                />
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={e => setNewUser({ ...newUser, password: e.target.value })}

                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <ButtonBootstrap variant="secondary" onClick={() => { setNewUserModalShow(false) }}>
              Cerrar
            </ButtonBootstrap>
            <ButtonBootstrap variant="primary" onClick={() => {
              createUser(newUser)
              setNewUserModalShow(false)
            }
            }>
              Guardar cambios
            </ButtonBootstrap>
          </Modal.Footer>
        </Modal>
        <Modal show={assigmentsModalShow} onHide={() => {
          setAssigmentsModalShow(false)}} size="sm">
          <Modal.Header closeButton>
            <Modal.Title>Asignaciones</Modal.Title>
          </Modal.Header>
          <Modal.Body>{reservesByUser.map((r)=>{return(<div><p>{r.startTime} : {r.endTime}</p></div>)})}</Modal.Body>
        </Modal>
      </div>


    </div>
  );
}

export default Users;
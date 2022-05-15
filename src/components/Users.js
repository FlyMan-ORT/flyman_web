import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from 'react-bootstrap/Modal';
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';
import ButtonBootstrap from 'react-bootstrap/Button'

const divContainerStyle = {
  height: 800,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: 20,
  paddingRight: 50,
};


function Users() {

  const [editModalShow, setEditModalShow] = useState(false)
  const [deleteModalShow, setDeleteModalShow] = useState(false)
  const [users, setUsers] = useState([]);
  const [userForDeletion, setUserForDeletion] = useState('');  

  async function deleteUser(userId) {
    const deleteResponse = (await axios.delete(`http://192.168.0.140:3000/users/${userId}`)).data;
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 70, hide: true },
    { field: 'name', headerName: 'Nombre', width: 300 },
    { field: 'phone', headerName: 'Telefono', width: 150 },
    {
      field: 'email', headerName: 'Email',
      sortable: false,
      width: 300,
      valueGetter: (params) =>
        `${params.row.email}`,
    },
    {
      headerName: 'Gestion',
      field: 'actions',
      type: 'actions',
      width: '400',

      getActions: (params) => [
        <GridActionsCellItem icon={<DeleteIcon />} onClick={() => {                    
          setUserForDeletion(params.row)          
          setDeleteModalShow(true)
        }
        }
          label="Delete" />,
        <GridActionsCellItem icon={<EditIcon />} onClick={() => { setEditModalShow(true) }} label="Print" />,
      ]
    },
  ];

  useEffect(() => {
    async function fetchData() {
      // TODO: sacar URL hardcodeada.
      const usersResponse = (await axios.get('http://192.168.0.140:3000/users/')).data;

      const usersForTable = usersResponse.map((user) => {
        return {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone
        }
      })

      setUsers(usersForTable);
    }
    fetchData();
  }, [users])

  return (
    <div style={divContainerStyle}>

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
                  type="email"
                  placeholder="name@example.com"
                  autoFocus
                />
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='text'
                  placeholder="name@example.com"
                  autoFocus
                />
                <Form.Label>Telefono</Form.Label>
                <Form.Control
                  type="phone
                "
                  placeholder="name@example.com"
                  autoFocus
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <ButtonBootstrap variant="secondary" onClick={() => { setEditModalShow(false) }}>
              Cerrar
            </ButtonBootstrap>
            <ButtonBootstrap variant="primary" onClick={() => { setEditModalShow(false) }}>
              Guardar cambios
            </ButtonBootstrap>
          </Modal.Footer>
        </Modal>

        <Modal show={deleteModalShow} onHide={() => setDeleteModalShow(false)} animation={true}>
          <Modal.Header closeButton>
            <Modal.Title>Eliminar usuario</Modal.Title>
          </Modal.Header>
          <Modal.Body>Esta a punto de eliminar al usuario {userForDeletion.name}</Modal.Body>
          <Modal.Footer>
            <ButtonBootstrap variant="secondary" onClick={() => setDeleteModalShow(false)}>
              Cancelar
            </ButtonBootstrap>
            <ButtonBootstrap variant="danger" onClick={() => {              
              deleteUser(userForDeletion.id)                                
              setDeleteModalShow(false)              
              
            }
            }>
              Confirmar
            </ButtonBootstrap>
          </Modal.Footer>
        </Modal>
      </div>


    </div>
  );
}

export default Users;
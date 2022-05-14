import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { DataGrid, GridActionsCellItem} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from 'react-bootstrap/Modal';
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';

const divContainerStyle = { 
  height: 800, 
  width: '100%', 
  display: 'flex', 
  flexDirection: 'column', 
  paddingLeft: 20,
  paddingRight: 50,
};

function Users() { 

  const [modalShow, setModalShow] = useState(false)
  const [users, setUsers] = useState([]);  

  const columns = [
    { field: 'id', headerName: 'ID', width: 70, hide: true },
    { field: 'name', headerName: 'Nombre', width: 300 },
    { field: 'phone', headerName: 'Telefono', width: 150 },
    { field: 'email', headerName: 'Email',
      sortable: false,
      width: 300,
      valueGetter: (params) =>
      `${params.row.email}`,
  },
  {
    headerName: 'Gestion',
    field: 'actions',
    type: 'actions',
    width:'400',
    
    getActions: (params) => [
      <GridActionsCellItem icon={<DeleteIcon/>} onClick={()=>alert('Usuario eliminado')} label="Delete" />,
      <GridActionsCellItem icon={<EditIcon/>} onClick={()=>setModalShow(true)} label="Print"/>,
    ]
  },  
  ];

  useEffect(() => {
    async function fetchData() {
        // TODO: sacar URL hardcodeada.
      const usersResponse = (await axios.get('http://192.168.0.140:3000/users/')).data;

      const usersForTable = usersResponse.map((user)=>{
        return {
          id:user._id,
          name:user.name,
          email:user.email,
          phone: user.phone
        }
      })      
      
      setUsers(usersForTable);
  }
  fetchData();
}, [])

    return (    
      <div style={divContainerStyle}>
        
      <DataGrid     
        rows={users}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />      
      <div>
        <Modal show={modalShow}>
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
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{setModalShow(false)}}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={()=>{setModalShow(false)}}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
        </div>


    </div>   
    );
  }
  
  export default Users;
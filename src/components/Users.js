import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { DataGrid, GridActionsCellItem} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const datagridStyle = {  


  
};

const columns = [
  { field: 'id', headerName: 'ID', width: 70, hide: true },
  { field: 'name', headerName: 'Nombre', width: 300 },
  { field: 'phone', headerName: 'Telefono', width: 300 },
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
    <GridActionsCellItem icon={<DeleteIcon/>} onClick={()=>alert('Usuario borrado')} label="Delete" />,
    <GridActionsCellItem icon={<EditIcon/>} onClick={()=>alert('Usuario editado')} label="Print"/>,
  ]
},

];

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
        // TODO: sacar URL hardcodeada.
      const usersResponse = (await axios.get('http://192.168.0.140:3000/users/')).data;
      

      const usersForTable = usersResponse.map((user)=>{
        return {
          id:user._id,
          name:user.name,
          email:user.email,
          phone: 'linea50-mockUp-mainContainer.js'
        }
      })      
      
      setUsers(usersForTable);
  }
  fetchData();
}, [])
    return (    
      <div style={{ height: 800, width: '100%', display: 'flex', flexDirection: 'column'}}>
      <DataGrid     
        rows={users}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />


    </div>   
    );
  }
  
  export default Users;
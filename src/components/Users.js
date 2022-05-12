import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { DataGrid} from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70, hide: true },
  { field: 'name', headerName: 'Nombre', width: 130 },
  { field: 'email', headerName: 'Email', width: 200,
    sortable: false,
    width: 160,
    valueGetter: (params) =>
    `${params.row.email}`,
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
          email:user.email
        }
      })      
      
      setUsers(usersForTable);
  }
  fetchData();
}, [])
    return (    
      <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>   
    );
  }
  
  export default Users;
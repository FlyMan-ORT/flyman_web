import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LinearProgress from '@mui/material/LinearProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ButtonBootstrap from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import { datesAscending } from '../../utils/sorting'
import { getMaintenanceUsers, createNewUser, updateOneUser, deleteOneUser } from '../../api/users';
import { getAllReservations } from '../../api/reservations';
import DeleteUserModal from './components/modals/DeleteUserModal';
import AssignmentsModal from './components/modals/AssignmentsModal';
import CreateUserModal from './components/modals/CreateUserModal';
import EditUserModal from './components/modals/EditUserModal';
import PinModal from './components/modals/PinModal';
import Snackbar from '../../components/Snackbar';
import { Button } from '@mui/material';


const divContainerStyle = {
  height: 800,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: 20,
  paddingRight: 50,
};

function Users() {
  const [users, setUsers] = useState([]);
  const [reserves, setReserves] = useState([]);
  const [userForEditOrDeletion, setUserForEditOrDeletion] = useState({});
  const [updateFlag, setUpdateFlag] = useState(false);
  const [showAssigmentsModal, setShowAssigmentsModal] = useState(false);
  const [reservesByUser, setReservesByUser] = useState([]);
  const [snackMessage, setSnackMessage] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [process, setProcess] = useState(true);
  const [showPinModal, setShowPinModal] = useState(false);

  const onOpenDeleteUserModal = (user) => {
    setUserForEditOrDeletion(user);
    setShowDeleteModal(true);
  }

  const onHideDeleteUserModal = () => {
    setShowDeleteModal(false);
    setUserForEditOrDeletion('');
  }

  const onOpenAssignmentsModal = (reserves) => {
    setReservesByUser(reserves);
    setShowAssigmentsModal(true);
  }

  const onHideAssignmentsModal = () => {
    setShowAssigmentsModal(false);
  }

  const onOpenCreateUserModal = () => {
    setShowCreateUserModal(true);
  }

  const onHideCreateUserModal = () => {
    setShowCreateUserModal(false);
  }

  const onOpenEditUserModal = (user) => {
    setUserForEditOrDeletion(user);
    setShowEditModal(true);
  }

  const onHideEditUserModal = () => {
    setShowEditModal(false);
    setUserForEditOrDeletion('');
  }

  const onErrorSnackbarOpen = (message) => {
    setSnackMessage(message);
    setOpenErrorSnackbar(true);
  }

  const onErrorSnackbarClose = () => {
    setOpenErrorSnackbar(false);
    setSnackMessage('');
  }

  const onSuccessSnackbarOpen = (message) => {
    setSnackMessage(message);
    setOpenSuccessSnackbar(true);
  }

  const onSuccessSnackbarClose = () => {
    setOpenSuccessSnackbar(false);
    setSnackMessage('');
  }

  const onOpenPinUserModal = (user) => {
    setUserForEditOrDeletion(user);
    setShowPinModal(true);
  }

  const onHidePinUserModal = () => {
    setShowPinModal(false);
    setUserForEditOrDeletion('');
  }

  async function createUser(user) {
    try {
      await createNewUser(user);
      onHideCreateUserModal();
      onSuccessSnackbarOpen('Usuario creado correctamente.')
      setUpdateFlag(!updateFlag)
    } catch (error) {
      onErrorSnackbarOpen(error.message);
    }
  }

  async function updateUser(user) {
    try {
      await updateOneUser(user.id, user);
      setShowEditModal(false);
      onSuccessSnackbarOpen('Usuario modificado correctamente.');
      setUpdateFlag(!updateFlag);
    } catch (error) {
      onErrorSnackbarOpen(error.message);
    }
  }

  async function deleteUser(userId) {
    try {
      await deleteOneUser(userId);
      setShowDeleteModal(false);
      onSuccessSnackbarOpen('Usuario borrado correctamente.');
      setUpdateFlag(!updateFlag);
    } catch (error) {
      onErrorSnackbarOpen(error.message);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setProcess(true);
        const usersResponse = await getMaintenanceUsers();
        const reserves = await getAllReservations();
        const usersForTable = usersResponse.map((user) => {
          return {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            pin: user.pin,
            admin: user.admin
          }
        })
        setUsers(usersForTable);
        setReserves(reserves)
        setProcess(false);
      } catch (error) {
        onErrorSnackbarOpen(error.message);
      }
    }
    fetchData();
  }, [updateFlag])

  const columns = [
    { field: 'id', headerName: 'ID', width: 70, hide: true },
    { field: 'name', headerName: 'Nombre', width: 150 },
    {
      headerName: 'Asignaciones',
      field: 'Asignaciones',
      type: 'actions',
      width: '120',
      renderCell: (params) => {
        const dayAsignations = reserves.filter(r => r.user.email === params.row.email).filter(r => (moment().isSame(moment(r.startTime), 'day')))
        return (
          <ButtonBootstrap variant="outline-secondary" onClick={() => {
            const filteredRserves = reserves.filter((r) =>
              r.user.email === params.row.email &&
              r.bookingType === 'MAINTENANCE' &&
              moment(r.startTime).isSame(moment(), 'day')
            ).sort(datesAscending);
            onOpenAssignmentsModal(filteredRserves);
          }}>
            Ver <Badge bg="dark">{dayAsignations.length}</Badge>
            <span className="visually-hidden"></span>
          </ButtonBootstrap>
        )
      }
    },
    { field: 'phone', headerName: 'Telefono', width: 150 },
    {
      field: 'Pin', headerName: 'PIN', type: 'actions', width: 100,
      getActions: (params) => [
        <GridActionsCellItem

          icon={<VisibilityIcon />}
          onClick={() => { onOpenPinUserModal(params.row); }}
          label="Pin"

        />,
      ]
    },
    {
      field: 'email', headerName: 'Email',
      sortable: false,
      width: 250,
      valueGetter: (params) =>
        `${params.row.email}`,
    },
    {
      field: 'admin', headerName: 'Administrador', width: 100, align: 'center',
      renderCell: (params) => {
        if (params.row.admin === true) {
          return (
            <CheckCircleIcon color="primary" />
          )
        } else {
          return (
            <p>-</p>
          )
        }
      }
    },
    {
      headerName: 'Gestion',
      field: 'actions',
      type: 'actions',
      width: '90',

      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          onClick={() => { onOpenDeleteUserModal(params.row); }}
          label="Delete"
        />,
        <GridActionsCellItem
          icon={<EditIcon />}
          onClick={() => { onOpenEditUserModal(params.row); }}
          label="Print"
        />,
      ]
    },
  ];

  return (
    <div style={divContainerStyle}>
      <Button
        variant="text"
        style={{ alignSelf: 'end', marginBottom: 10 }}
        onClick={onOpenCreateUserModal}
      >
        <PersonAddIcon style={{ marginRight: 5 }} /> Nuevo Usuario
      </Button>

      <DataGrid
        rows={users}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
        components={{
          LoadingOverlay: LinearProgress,
          Toolbar: GridToolbar,
        }}
        loading={process}
        {...users}
      />

      <div>

        <EditUserModal
          show={showEditModal}
          onHide={onHideEditUserModal}
          onEditUser={updateUser}
          userToEdit={userForEditOrDeletion}
        />

        <DeleteUserModal
          show={showDeleteModal}
          user={userForEditOrDeletion}
          onHide={onHideDeleteUserModal}
          onDelete={(id) => { deleteUser(id) }}
        />

        <CreateUserModal
          show={showCreateUserModal}
          onHide={onHideCreateUserModal}
          onCreateUser={createUser}
        />

        <AssignmentsModal
          show={showAssigmentsModal}
          onHide={onHideAssignmentsModal}
          reservations={reservesByUser}
        />

        <PinModal
          show={showPinModal}
          onHide={onHidePinUserModal}
          user={userForEditOrDeletion}
        />

        <Snackbar
          open={openErrorSnackbar}
          onClose={onErrorSnackbarClose}
          message={snackMessage}
          severity='error'
        />

        <Snackbar
          open={openSuccessSnackbar}
          onClose={onSuccessSnackbarClose}
          message={snackMessage}
          severity='success'
        />

      </div>
    </div>
  );
}

export default Users;

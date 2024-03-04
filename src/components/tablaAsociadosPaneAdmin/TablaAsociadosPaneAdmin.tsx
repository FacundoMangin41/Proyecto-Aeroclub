import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  esES,
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';
import { Modal} from '@mui/material';
import { useEffect, useState } from 'react';
import AdminDetallesAsociados from '../../pages/admin-detalles-asociados/AdminDetallesAsociados';
import { useNavigate } from 'react-router-dom';

import { apiUsuarios } from '../../services/apiUsuarios';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { apiCuentaCorriente } from '../../services/apiCuentaCorriente';

const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
  return randomArrayItem(roles);
};
const theme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  esES,
);
const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// Ejemplo de estructura de datos para la tabla
// const initialRows: GridRowsProp = [
//   { id: 1, apellido: 'Snow', nombre: 'Jon', edad: 35 ,nombreCompleto: 'Snow Jon'},
//   { id: 2, apellido: 'Lannister', nombre: 'Cersei', edad: 42 ,nombreCompleto: 'Lannister Cersei'},
//   { id: 3, apellido: 'Lannister', nombre: 'Jaime', edad: 45 ,nombreCompleto: 'Lannister Jaime'},
//   { id: 4, apellido: 'Stark', nombre: 'Arya', edad: 16 ,nombreCompleto: 'Stark Arya'},
//   { id: 5, apellido: 'Targaryen', nombre: 'Daenerys', edad: null ,nombreCompleto: 'Targaryen Daenerys'},
//   { id: 6, apellido: 'Melisandre', nombre: null, edad: 150 ,nombreCompleto: 'Melisandre'},
//   { id: 7, apellido: 'Clifford', nombre: 'Ferrara', edad: 44 ,nombreCompleto: 'Clifford Ferrara'},
//   { id: 8, apellido: 'Frances', nombre: 'Rossini', edad: 36 ,nombreCompleto: 'Frances Rossini'},
//   { id: 9, apellido: 'Roxie', nombre: 'Harvey', edad: 65 ,nombreCompleto: 'Roxie Harvey'},
// ];


export default function TablaAsociadosPanelAdmin() {
  // ************************************************************************************
  //                                    Manejo de la api
  // ************************************************************************************
  const getSaldo = async (id: string) => {
    try {
      const response = await apiCuentaCorriente.getById(id);
      return (parseInt(response));
    }
    catch (error:any) {
      console.log(error.message);
      return(null);
    }
  };

  const [rows, setRows] = useState<GridRowsProp>([]);
  const fetchData = async () => {
    try {
      const response = await apiUsuarios.getUsuarios();
      
      const resultado = await Promise.all(response.map(async (user: any) => {
        const saldoAsociado = await getSaldo(user.id_usuarios);
  
        const usuarioFormateado = { 
          id: user.id_usuarios,
          nombreCompleto: user.nombre + " " + user.apellido, 
          dni:  user.dni, 
          email: user.email, 
          telefono: user.telefono, 
          apellido: user.apellido,
          nombre: user.nombre,
          direccion: user.direccion,
          estado_hab_des: user.estado_hab_des,
          fecha_alta: user.fecha_alta,
          fecha_baja: user.fecha_baja,
          foto_perfil: user.foto_perfil,
          roles: user.roles,
          saldo: "$ " + saldoAsociado
        };
        return usuarioFormateado;
      }));
      setRows(resultado);
    } catch (error:any) {
      console.log(error.message);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  // ************************************************************************************
  //                Manejo del Dialog para confirmar borrado desde la tabla
  // ************************************************************************************
  const [openDialog, setOpenDialog] = React.useState(false);
  // Para borrar el usuario solo necesito el email, por eso el state es de tipo String
  const [borrarAsociado, setBorrarAsociado] = React.useState("");
  const handleCloseDialog = () => {
    setBorrarAsociado("");
    setOpenDialog(false);
  };
  const handleConfirmDialog = async () => {
    console.log(borrarAsociado);
    try {
    await apiUsuarios.deleteUserByEmail(borrarAsociado);
    } catch (error:any) {
      console.log(error.message);
    }
    setBorrarAsociado("");
    setOpenDialog(false);
  };

  
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const navigate = useNavigate ();
  
  // Utilizo este estado para almacenar la informacion que se renderiza en el modal
  const [verAsociado, setVerAsociado] = useState({});

  // ************************************************************************************
  //                      Manejo del modal para ver un asociado
  // ************************************************************************************
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false)
    setVerAsociado({});
  };

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    let asociado = rows.filter((row) => row.id === id);
    navigate("/admin-editar-usuarios", { state: { asociado: asociado[0] }, replace: true });
    // setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleVerClick = (id: GridRowId) => () => {
    setVerAsociado(rows.filter((row) => row.id === id));
    setOpen(true);
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setBorrarAsociado(rows.filter((row) => row.id === id)[0].email);
    setOpenDialog(true);
    
    // setRows(rows.filter((row) => row.id !== id));
  };


  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  // Columnas de la tabla
  const columns: GridColDef[] = [
    {
      field: 'nombreCompleto',
      headerName: 'Nombre Completo',
      width: 200,
      type: 'string'
    },
    {
        field: 'saldo',
        headerName: 'Saldo',
        type: 'number',
        width: 100,
        align: 'left',
        headerAlign: 'left'
      },
    {
      field: 'telefono',
      headerName: 'Telefono',
      width: 170,
      type: 'string'
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Acciones',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<VisibilityIcon />}
            label="Ver mas"
            className="textPrimary"
            onClick={handleVerClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Editar"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Borrar"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <ThemeProvider theme={theme}>
        <DataGrid
          rows={rows}
          getRowId={(rows) => rows?.id}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          // slots={{
          //   toolbar: EditToolbar,
          // }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
      </ThemeProvider>
      {/* Modal para ver informacion de un asociado */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <AdminDetallesAsociados datos={verAsociado}/>
        </Box>
      </Modal>

      {/* Dialogo para confirmar borrado */}
      <React.Fragment>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>¿Estas seguro de borrar el asociado?</DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button onClick={handleConfirmDialog}>Confirmar</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </Box>
  );
}

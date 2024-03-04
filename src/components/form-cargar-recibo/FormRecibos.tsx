import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "./formRecibos.css";
import { Autocomplete, Checkbox, FormControlLabel } from "@mui/material";
import { apiUsuarios } from "../../services/apiUsuarios";



// ************************************************************************************
//                               Manejo de itinerarios
// ************************************************************************************

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
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
} from '@mui/x-data-grid';
import {
  randomId,
} from '@mui/x-data-grid-generator';
import { apiAeronaves } from "../../services/apiAeronaves";
import { usuarioEnSesion } from "../../atomos/atoms";
import { useRecoilState } from "recoil";
import { apiReciboVuelos } from "../../services/apiReciboVuelos";
import formatearFecha, { formatearFechaConHora } from "../../functions/formatearFecha/formatearFecha";


const initialRows: GridRowsProp = [
  {
    id: randomId()
  }
];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Añadir Itinerario
      </Button>
    </GridToolbarContainer>
  );
}



export default function FormRecibos() {
  // Cargo el input de gestor con el usuario de la sesion
  const [userSesion, setUserSesion] = useRecoilState(usuarioEnSesion);
  // ************************************************************************************
  //                            Carga del selector de usuarios
  // ************************************************************************************

  const [asociados, setAsociados] = useState([]);
  const fetchDataAsociados = async () => {
    try {
      const response = await apiUsuarios.getAsociados();
      // Mapeo la respuesta de la api y la convierto a un array de objetos que se usara para cargar el selector de asociados
      const resultado = response.map((user: any)=>{
        const usuarioFormateado = { 
          id: user.id_usuarios,
          nombre: user.nombre + " " + user.apellido,
          email: user.email
        };
        return usuarioFormateado;
      });
      setAsociados (resultado);
    } catch (error:any) {
      console.log(error.message);
    }
  };

  const [value, setValue] = React.useState<string | null>(asociados[0]);
  const [inputValue, setInputValue] = React.useState('');


  // ************************************************************************************
  //                            Carga del selector de matriculas
  // ************************************************************************************

  const [matriculas, setmatriculas] = useState([]);
  const fetchDataMatriculas = async () => {
    try {
      const response = await apiAeronaves.get();
      // Mapeo la respuesta de la api y la convierto a un array de objetos que se usara para cargar el selector de matriculas
      const resultado = response.map((aeronave: any)=>{
        const matriculaFormateada = { 
          matricula: aeronave.matricula,
          label: aeronave.modelo + " (" + aeronave.matricula + ")"
        };
        return matriculaFormateada;
      });
      setmatriculas (resultado);
    } catch (error:any) {
      console.log(error.message);
    }
  };

  const [valueAeronave, setValueAeronave] = React.useState<string | null>(asociados[0]);
  const [inputValueAeronave, setInputValueAeronave] = React.useState('');
  // ************************************************************************************
  //                               Vuelo con instructor
  // ************************************************************************************
  const [conInstructor, setConInstructor] = React.useState(false);

  const handleChangeInstructor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConInstructor(event.target.checked);
    setValueInstructor(null);
    setInputValueInstructor('');
  };

  const [instructores, setInstructores] = useState([{email: "", nombre: "Seleccionar"}]);
  const fetchDataInstructores = async () => {
    try {
      const response = await apiUsuarios.getInstructores();
      // Mapeo la respuesta de la api y la convierto a un array de objetos que se usara para cargar el selector de asociados
      const resultado = response.respuesta.map((user: any)=>{
        const usuarioFormateado = { 
          id: user.id_usuarios,
          nombre: user.nombre + " " + user.apellido,
          email: user.email
        };
        return usuarioFormateado;
      });
      setInstructores (resultado);
    } catch (error:any) {
      console.log(error.message);
    }
  };

  const [valueInstructor, setValueInstructor] = React.useState<string | null>(instructores[0]);
  const [inputValueInstructor, setInputValueInstructor] = React.useState('');


  useEffect(() => {
    fetchDataAsociados();
    fetchDataMatriculas();
    fetchDataInstructores();
  }, []);
  // ************************************************************************************
  //                               Manejo de itinerarios
  // ************************************************************************************
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
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
      field: 'horaSalida',
      headerName: 'Hora Salida',
      type: 'dateTime',
      width: 150,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    { 
      field: 'horaLlegada', 
      headerName: 'Hora Llegada',
      type: 'dateTime',
      width: 150,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'codAeroLlegada',
      headerName: 'Lugar Llegada',
      type: 'string',
      width: 110,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'codAeroSalida',
      headerName: 'Lugar Salida',
      type: 'string',
      width: 100,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'cantAterrizajes',
      headerName: 'Aterrizajes',
      type: 'number',
      width: 80,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'tipoItinerario',
      headerName: 'Tipo itinerario',
      width: 120,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Vuelo nocturno', 'Doble comando', "Sólo con instrucción", "Travesía", "Vuelo por Instrumentos bajo capota"],
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Opciones',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Guardar"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancelar"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
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
  



  // ************************************************************************************
  //                         Funcion formatear itinerarios
  // ************************************************************************************
  function formatearItinerarios (rows: any){
    let itinerarios = rows.map((row: any) => ({
      horaSalida: formatearFechaConHora(row.horaSalida),
      codAeroSalida: row.codAeroSalida,
      horaLlegada: formatearFechaConHora(row.horaLlegada),
      codAeroLlegada: row.codAeroLlegada,
      cantAterrizajes: row.cantAterrizajes,
      tipoItinerario: row.tipoItinerario,
    }));

    return itinerarios;
  }


  // ************************************************************************************
  //                                  Funcion OnSubmit
  // ************************************************************************************
  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    // Verifico si el email del instructor es null, en caso que lo sea cargo la variable con un string vacio
    const emailInstructor = valueInstructor?.email || '';
    console.log(emailInstructor);


    // Validar que el día de llegada sea mayor al día de salida
    const itinerariosValidos = rows.every((itinerario) => {
      const horaSalida = itinerario.horaSalida as Date;
      const horaLlegada = itinerario.horaLlegada as Date;
      return horaSalida < horaLlegada;
    });

    if (!itinerariosValidos) {
      alert('El día de llegada debe ser mayor al día de salida en todos los itinerarios.');
      // Puedes mostrar un mensaje de error al usuario o tomar alguna acción adicional
      return;
    }
    const itinerariosFormateados = formatearItinerarios(rows);
    const datos = {
      emailAsociado: value.email,
      emailInstructor: emailInstructor,
      emailGestor: e.target.emailGestor.value,
      observaciones: e.target.observaciones.value,
      matricula: valueAeronave.matricula,
      itinerarios: itinerariosFormateados,
    };
    // console.log("Valores de los formularios:", rows);
    console.log(datos);
    try {
      await apiReciboVuelos.post(datos);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <form className="reducirTabla" onSubmit={enviar}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormGroup className="cargaReciboVuelo"
        
          // Esta clase hace que se vea mal los selectores
          // className="formulario-editar-usuario"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "30ch" },
          }}
        >
          <h1 className="panelAdminTitle">Cargar Recibo de vuelo</h1>
          <Box className="fila-formulario-editar-usuario">
            <Autocomplete
              disablePortal
              id="emailAsociado"
              options={asociados}
              getOptionLabel={(asociados) => asociados.nombre}
              value={value}
              onChange={(event: any, newValue: string | null) => {
                setValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Asociado *" />}
            />
          </Box>
          <Box className="fila-formulario-editar-usuario VueloInstructor">
            <FormControlLabel control={
              <Checkbox
                checked={conInstructor}
                onChange={handleChangeInstructor}
                inputProps={{ 'aria-label': 'controlled' }}
              />} 
              label="¿Vuelo con instrucción?" 
            />
            <Autocomplete
              disabled={!conInstructor}
              disablePortal
              id="emailInstructor"
              options={instructores}
              getOptionLabel={(instructores) => instructores.nombre}
              value={valueInstructor}
              onChange={(event: any, newValue: string | null) => {
                setValueInstructor(newValue);
              }}
              inputValue={inputValueInstructor}
              onInputChange={(event, newInputValue) => {
                setInputValueInstructor(newInputValue);
              }}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField
                {...params}
                label="Instructor"
                hidden={!conInstructor}
              />}
            />
          </Box>
          <Box className="fila-formulario-editar-usuario">
            <TextField
              id="emailGestor"
              value={userSesion.email}
              label="E-mail Gestor"
              variant="filled"
              defaultValue=""
              required
            />
          </Box>

          <Box className="fila-formulario-recibo-observaciones">
            <TextField
              id="observaciones"
              label="Observaciones"
              placeholder=""
              multiline
              rows={3}
            />
          </Box>

          <Box className="fila-formulario-editar-usuario">
          <Autocomplete
              disablePortal
              id="matricula"
              options={matriculas}
              getOptionLabel={(matriculas) => matriculas.label}
              value={valueAeronave}
              onChange={(event: any, newValue: string | null) => {
                setValueAeronave(newValue);
              }}
              inputValue={inputValueAeronave}
              onInputChange={(event, newInputValue) => {
                setInputValueAeronave(newInputValue);
              }}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Aeronave *" />}
            />
          {/* <Autocomplete
            disablePortal
            id="matricula"
            options={matriculas}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Matricula *" />}
          /> */}
          </Box>
        </FormGroup>






      <div className="cajaItinerarios">
        <Box className="fila-formulario-recibo-observaciones">
            <h1>Itinerarios</h1>
        </Box>

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
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
        </Box>
      </div>
      
      

        <Button className="botonCargaRecibo" type="submit" variant="contained" endIcon={<SendIcon />}>
          Cargar
        </Button>
      </LocalizationProvider>
    </form>
  );
}

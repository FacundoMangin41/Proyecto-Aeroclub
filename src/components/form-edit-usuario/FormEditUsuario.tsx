import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import "./formEditUsuario.css";
import { apiUsuarios } from '../../services/apiUsuarios';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
// import { useNavigate } from 'react-router-dom';


function formatearFecha (fechaRecibida:any) {
  if (fechaRecibida == null) return '';
  let fecha =new Date(fechaRecibida);
  // Obtén los componentes de la fecha (año, mes, día)
  const year = fecha.getFullYear();
  const month = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses comienzan desde 0, así que sumamos 1
  const day = String(fecha.getDate()).padStart(2, '0');


  return `${year}-${month}-${day}`.toString();
}
export default function FormEditUsuario(props:any) {
  const navigate = useNavigate();
  const datosAsociado = props.datosAsociado;


  // No encontre forma de añadir la variable id en la fecha, encontre esta solucion para manejar en submit.
  const [fecha_alta, setFecha_alta] = React.useState<Dayjs | null>(dayjs(formatearFecha(datosAsociado.fecha_alta)));


  const handleSubmit=  async (e: React.FormEvent) => {
    // const navigate = useNavigate();
    e.preventDefault();
    const datos = {
      email: e.target.email.value,
      nombre: e.target.nombre.value,
      apellido: e.target.apellido.value,
      telefono: e.target.telefono.value,
      direccion: e.target.direccion.value,
      dni: e.target.dni.value,
      habilitado: 1
    };
    const response = await apiUsuarios.patch(datos);
    navigate ("/panel-administrador");
  };

  return (
    <form onSubmit={handleSubmit}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormGroup
          className='formulario-cargar-usuario'
          sx={{
              '& .MuiTextField-root': { m: 1,  },
          }}
        >
          <Typography className="titulo-cargar-usuario" variant="h4">
            Editar un usuario
          </Typography>
          {/* Nombre y apellido */}
          <Box className="fila-formulario-editar-usuario">
            <TextField
              id="nombre"
              defaultValue = {datosAsociado.nombre}
              label="Nombre"
              variant="filled"
              required
            />
            <TextField
              id="apellido"
              defaultValue = {datosAsociado.apellido}
              label="Apellido"
              variant="filled"
              required
            />
          </Box>
          {/* DNI y E-Mail */}
          <Box className="fila-formulario-editar-usuario">
            <TextField
              id="dni"
              defaultValue = {datosAsociado.dni}
              label="DNI"
              variant="filled"
              required
            />
            <TextField
              id="email"
              defaultValue = {datosAsociado.email}
              label="E-mail"
              variant="filled"
              required
              disabled
            />
          </Box>
          {/* Direccion y Telefono */}
          <Box className="fila-formulario-editar-usuario">
            <TextField
              id="direccion"
              defaultValue = {datosAsociado.direccion}
              label="Dirección"
              variant="filled"
              required
            />
            <TextField
              id="telefono"
              defaultValue = {datosAsociado.telefono}
              label="Telefono"
              variant="filled"
            />
          </Box>
          <Box className="fila-formulario-editar-usuario">
            {/* Fecha de alta */}
            <DemoContainer components={['DatePicker']}>
                <DatePicker
                format="MM - DD - YYYY"
                value={fecha_alta}
                disabled
                onChange={(newValue) => setFecha_alta(newValue)}
                label="Fecha de alta" 
                slotProps={{
                  textField: {
                  helperText: 'MM/DD/YYYY',
                  },
                }}
                />
            </DemoContainer>
          </Box>
          <Button className='botonEditarUsuario' type="submit" variant="contained" endIcon={<SaveIcon />}>
            Guardar
          </Button>
        </FormGroup>
      </LocalizationProvider>
    </form>
  );
}

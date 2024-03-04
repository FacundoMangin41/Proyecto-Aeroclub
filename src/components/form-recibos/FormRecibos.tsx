import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
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
import "./formRecibos.css";
import MenuItem from '@mui/material/MenuItem';


const currencies = [
    {
      value: 'A',
      label: 'a',
    },
    {
      value: 'B',
      label: 'b',
    },
    {
      value: 'C',
      label: 'c',
    },
    {
      value: 'D',
      label: 'd',
    },
  ];


export default function FormRecibos() {
  // No encontre forma de añadir la variable id en la fecha, encontre esta solucion para manejar en submit.
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

  // Opcion para controlar ingreso de datos. Esta mal implementado, es solo de muestra
  const [error, setError] = useState('');
  const handleValidation = (inputValue:any) => {
    if (inputValue.length === 0) {
      setError('Este campo es obligatorio.');
    } else {
      setError('');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <FormGroup
      className='formulario-editar-usuario'
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
    >
      <Box className="fila-formulario-editar-usuario">
        <TextField
          id="nombre"
          label="Nombre"
          variant="filled"
          defaultValue=""
          helperText={error}
          error={Boolean(error)}
          onBlur={(e) => handleValidation(e.target.value)}
        />
        <TextField
          id="apellido"
          label="Apellido"
          variant="filled"
          defaultValue=""
          helperText={error}
          error={Boolean(error)}
          onBlur={(e) => handleValidation(e.target.value)}
        />
      </Box>
        <Box className="fila-formulario-editar-usuario">
        <TextField
          id="filled-select-currency"
          select
          label="Tipo de recibo"
          defaultValue="EUR"
          variant="filled"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        </Box>
      <Box className="fila-formulario-editar-usuario">
        <TextField
          id="itinerario"
          label="itinerario"
          variant="filled"
          defaultValue=""
          helperText={error}
          error={Boolean(error)}
          onBlur={(e) => handleValidation(e.target.value)}
        />
        <TextField
          id="observaciones"
          label="Observaciones"
          variant="filled"
          defaultValue=""
          helperText={error}
          error={Boolean(error)}
          onBlur={(e) => handleValidation(e.target.value)}
        />
      </Box>
      <Box className="fila-formulario-editar-usuario">
        {/* Fecha de nacimiento */}
        <DemoContainer components={['DatePicker']}>
            <DatePicker
            format="MM - DD - YYYY"
            value={value}
            onChange={(newValue) => setValue(newValue)}
            label="Fecha" 
            slotProps={{
              textField: {
              helperText: 'MM/DD/YYYY',
              },
            }}
            />
        </DemoContainer>
        <FormControl sx={{ m: 1 }} variant="filled">
          <InputLabel htmlFor="filled-adornment-amount">Saldo</InputLabel>
          <FilledInput
            id="saldo"
            error={Boolean(error)}
            onBlur={(e) => handleValidation(e.target.value)}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
      </Box>
      
      <Button variant="contained" endIcon={<SendIcon />}>
        Enviar
      </Button>
    </FormGroup>
    </LocalizationProvider>
  );
}

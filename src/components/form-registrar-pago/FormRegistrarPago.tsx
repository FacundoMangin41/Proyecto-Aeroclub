import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Autocomplete, FormControl, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { apiUsuarios } from "../../services/apiUsuarios";
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { apiTransacciones } from "../../services/apiTransacciones";
import "./formRegistrarPagos.css";





export default function FormRegistrarPago() {
  // Manejo de fecha
  const [fecha, setFecha] = React.useState<Dayjs | null>(dayjs());

// Manejo del selector tipo de pago
  const [tipoPago, setTipoPago] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setTipoPago(event.target.value as string);
  };
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

  useEffect(() => {
    fetchDataAsociados();
  }, []);



  // ************************************************************************************
  //                                  Funcion OnSubmit
  // ************************************************************************************
  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();

    const datos = {
      monto : e.target.monto.value as number,
      idUsuario: value.id, 
      motivo: e.target.motivo.value,
      tipoPago: tipoPago,
      fecha: fecha.format('YYYY-MM-DD'), // Formatear la fecha
    };
    
    try {
      await apiTransacciones.post(datos);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={enviar} className="form-registrar-pagos">
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormGroup
        //   className="formulario-editar-usuario"
        //   sx={{
        //     "& .MuiTextField-root": { m: 1, width: "25ch" },
        //   }}
        >
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

            <FormControl >
                <InputLabel htmlFor="outlined-adornment-amount">Monto</InputLabel>
                <OutlinedInput
                    id="monto"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    label="Monto"
                    type="number"
                    required
                />
            </FormControl>
            
            <FormControl >
              <InputLabel id="demo-simple-select-label">Tipo de pago</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="tipoPago"
                value={tipoPago}
                label="Tipo de pago"
                required
                onChange={handleChange}
              >
                <MenuItem value={"Cheque"}>Cheque</MenuItem>
                <MenuItem value={"Efectivo"}>Efectivo</MenuItem>
                <MenuItem value={"Transferencia"}>Transferencia</MenuItem>
              </Select>
            </FormControl>

            <Box className="fila-formulario-recibo-observaciones">
                <TextField
                    id="motivo"
                    label="Motivo"
                    placeholder=""
                    required
                    multiline
                    rows={3}
                    fullWidth
                />
            </Box>


          
            <DatePicker
              label="Fecha"
              value={fecha}
              onChange={(newFecha) => setFecha(newFecha)}
            />
        </FormGroup>
        <Button type="submit" variant="contained" endIcon={<SendIcon />} className="boton-registrar-pagos">
            Cargar
        </Button>
    </LocalizationProvider>
    </form>
  );
}

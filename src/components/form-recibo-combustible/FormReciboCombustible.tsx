import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import FormGroup from "@mui/material/FormGroup";
import { FormControl, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { apiTransacciones } from "../../services/apiTransacciones";
import "./formReciboCombustible.css";
import { useRecoilState } from "recoil";
import { usuarioEnSesion } from "../../atomos/atoms";





export default function FormReciboCombustible() {
  const [userSesion, setUserSesion] = useRecoilState(usuarioEnSesion);

// Manejo del selector tipo de pago
  const [tipoPago, setTipoPago] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setTipoPago(event.target.value as string);
  };
  // ************************************************************************************
  //                                  Funcion OnSubmit
  // ************************************************************************************
  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();

    const datos = {
        emailGestor:e.target.emailGestor.value,
        observaciones:e.target.observaciones.value,
        monto : parseFloat(e.target.monto.value),
        tipoPago:tipoPago,
        motivo:e.target.motivo.value
    };
    // console.log(datos);
    try {
      await apiTransacciones.postCombustible(datos);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={enviar} className="form-registrar-pagos">
        <FormGroup
          // className="formulario-editar-usuario"
          // sx={{
          //   "& .MuiTextField-root": { m: 1, width: "25ch" },
          // }}
        >
            <Box className="fila-formulario-editar-usuario">
              <TextField
                id="emailGestor"
                value={userSesion.email}
                label="E-mail Gestor"
                variant="filled"
                defaultValue=""
                required
                disabled
                fullWidth
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
                    defaultValue="Cargar combustible"
                    multiline
                    rows={3}
                    fullWidth
                />
            </Box>
            <Box className="fila-formulario-recibo-observaciones">
                <TextField
                    id="observaciones"
                    label="Observaciones"
                    placeholder=""
                    multiline
                    rows={3}
                    fullWidth
                />
            </Box>


        </FormGroup>
        <Button type="submit" variant="contained" endIcon={<SendIcon />} className="boton-registrar-pagos">
            Cargar
        </Button>
    </form>
  );
}

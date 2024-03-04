import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import FormGroup from '@mui/material/FormGroup';
import "./CargarUsuarioNuevo.css";
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiLogin } from '../../services/apiLogin';

export default function CargarUsuarioNuevo() {
  const location = useLocation();
  const emailGoogle = location.state?.emailGoogle || '';
  const navigate = useNavigate();  

  
  async function handleSubmit(e: any) {
    e.preventDefault();
    const datos = {
      nombre: e.target.nombre.value,
      apellido: e.target.apellido.value,
      dni: parseFloat(e.target.dni.value),
      email: e.target.email.value,
      telefono: e.target.telefono.value,
      direccion: e.target.direccion.value
    }
    await apiLogin.post(datos);
    navigate("/");
  }

  return (
      <form onSubmit={handleSubmit}>
        <FormGroup
        className='formulario-cargar-usuario'
        sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        >
        <Typography className="titulo-cargar-usuario" variant="h4">
            Ingresa tus datos
        </Typography>
        <Box className="fila-formulario-editar-usuario">
            <TextField
            id="nombre"
            label="Nombre"
            variant="filled"
            defaultValue=""
            required
            />
            <TextField
            id="apellido"
            label="Apellido"
            variant="filled"
            defaultValue=""
            required
            />
        </Box>
        <Box className="fila-formulario-editar-usuario">
            <TextField
            id="dni"
            label="DNI"
            variant="filled"
            defaultValue=""
            required
            />
            <TextField
            id="email"
            label="E-mail"
            variant="filled"
            defaultValue={emailGoogle}
            required
            disabled
            />
        </Box>
        <Box className="fila-formulario-editar-usuario">
            <TextField
            id="telefono"
            label="Telefono"
            variant="filled"
            defaultValue=""
            required
            />
            <TextField
            id="direccion"
            label="Dirección"
            variant="filled"
            defaultValue=""
            required
            />
        </Box>
        
        <Button type="submit" variant="contained" endIcon={<SendIcon />}>
          Registrarse
        </Button>
        </FormGroup>
      </form>
  );
}


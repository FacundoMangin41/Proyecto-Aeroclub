import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import "./cargarUsuario.css";
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { resolverToken } from '../../api/apiCalls';
import { apiRoles } from '../../services/apiRoles';
import { apiLogin } from '../../services/apiLogin';

export default function CargarUsuario() {

  

//   ------------------------------ Validacion------------------------------------
    const navigate = useNavigate();
  
    async function checkTokenAndRol() {
      const getTokenLocal = await localStorage.getItem("token");
      const [roles, setRoles] = useState<string[]>([]);
    setRoles(await apiRoles.get(localStorage.getItem("email")));
    
  
      if (getTokenLocal == "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Sin autorización, no tenes iniciada sesión",
        });
        navigate("/", { replace: true });
      }
  
      try {
        const resResolverToken = await resolverToken();
  
        if (resResolverToken.success) {
  
          if (!roles.includes("Gestor")) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "El usuario no posee el rol de gestor para acceder",
            });
  
            navigate("/", { replace: true });
          } else {
            console.log(resResolverToken.dataToken);
          }
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Un error inesperado",
        });
      }
    }
  
    useEffect(() => {
      checkTokenAndRol().then(() => {
        console.log("se cumplio");
      });
    }, []);
  //   ------------------------------ Validacion------------------------------------


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
    // console.log(datos);
    await apiLogin.post(datos);
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup
      className='formulario-cargar-usuario'
      sx={{
          '& .MuiTextField-root': { m: 1,  },
      }}
      >
      <Typography className="titulo-cargar-usuario" variant="h4">
        Carga un usuario nuevo
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
          defaultValue=""
          required
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
      
      <Button className='botonCargarUsuarioNuevo' type="submit" variant="contained" endIcon={<SendIcon />}>
        Cargar
      </Button>
      </FormGroup>
    </form>
);
}


import { Usuarios } from "../../types";
import "./CardMostrarAsociados.css";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from "@mui/material/Box";
import formatearFecha from "../../functions/formatearFecha/formatearFecha";

interface Props {
  asociado: Usuarios;
}

function CardMostrarAsociados({ asociado }: Props) {

  function listaRoles () {
    let roles = asociado.roles[0];
    try {
      // Si no es un array (Solo tiene 1 rol cargado) devuelvo 1 solo Typography
    if (!Array.isArray(roles)) {
      return (
        <Typography key={roles} className="datos-asociados" variant="body2" color="textSecondary">
            {roles.tipo}
        </Typography>
      );
    }

    // Sino realizo un mapeo
    return (
      <div>
        {roles.map((rol: any) => (
          <Typography key={rol} className="datos-asociados" variant="body2" color="textSecondary">
            {rol.tipo}
          </Typography>
        ))}
      </div>
    );
    }
    catch (error) {
      return (
        <Typography className="datos-asociados" variant="body2" color="textSecondary">
            Este asociado no posee un rol...
        </Typography>
      );
    }
  };

  return (
  <div className="card">
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Box >
            <div className="class-avatar">
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 56, height: 56 }}
            />          
            <Typography className="asociado-nombreCompleto" gutterBottom variant="h5" component="div">
              {asociado.nombreCompleto}
            </Typography>
            </div>
          </Box>
          <Typography className="datos-asociados" variant="body2" color="text.secondary">
            Nombre: {asociado.nombre}
          </Typography>
          <Typography className="datos-asociados" variant="body2" color="text.secondary">
            Apellido: {asociado.apellido}
          </Typography>
          <Typography className="datos-asociados" variant="body2" color="text.secondary">
            Saldo: {asociado.saldo}
          </Typography>
          <Typography className="datos-asociados" variant="body2" color="text.secondary">
            E-Mail: {asociado.email}
          </Typography>
          <Typography className="datos-asociados" variant="body2" color="text.secondary">
            Telefono: {asociado.telefono}
          </Typography>
          <Typography className="datos-asociados" variant="body2" color="text.secondary">
            DNI: {asociado.dni}
          </Typography>
          <Typography className="datos-asociados" variant="body2" color="text.secondary">
            Fecha Alta: {formatearFecha(asociado.fecha_alta)}  
          </Typography>
          {/* <Typography className="datos-asociados" variant="body2" color="text.secondary">
            Fecha Baja: {asociado.fecha_baja}
          </Typography> */}
          <Typography className="datos-asociados" variant="body2" color="text.secondary">
            Dirección: {asociado.direccion}
          </Typography>
          <Typography className="datos-asociados" variant="body2" color="text.secondary">
            Roles
          </Typography>
          <Box>
            {listaRoles()}
          </Box>
        </CardContent>
      </Card>
    </div>
  )
}

export { CardMostrarAsociados };

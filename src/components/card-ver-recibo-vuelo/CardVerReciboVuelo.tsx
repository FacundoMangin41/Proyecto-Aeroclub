import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import { Divider } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import formatearFecha, { formatearFechaConHora } from '../../functions/formatearFecha/formatearFecha';



function CardVerReciboVuelo(recibo: any) {

  
  
  const datosRecibo = recibo.datos[0];
  function listaItinerarios () {
    let itinerarios = datosRecibo.itinerarios;
    console.log(recibo);
      // Si no es un array (Solo tiene 1 itinerario cargado) devuelvo 1 solo Typography
    if (!Array.isArray(itinerarios)) {
      return (
            <Box  key={itinerarios}>
                <Divider><FiberManualRecordIcon></FiberManualRecordIcon></Divider>
                <Typography className="datos-asociados" variant="body2" color="textSecondary">
                    Salida: {itinerarios.codAeroSalida}
                </Typography>
                <Typography className="datos-asociados" variant="body2" color="textSecondary">
                    Llegada: {itinerarios.codAeroLlegada}
                </Typography>
                <Typography className="datos-asociados" variant="body2" color="textSecondary">
                    Hora Salida: {formatearFechaConHora(itinerarios.horaSalida)}
                </Typography>
                <Typography className="datos-asociados" variant="body2" color="textSecondary">
                    Hora Llegada: {formatearFechaConHora(itinerarios.horaLlegada)}
                </Typography>
                <Typography className="datos-asociados" variant="body2" color="textSecondary">
                    Aterrizajes: {itinerarios.cantAterrizajes}
                </Typography>
                <Typography className="datos-asociados" variant="body2" color="textSecondary">
                    Tipo itinerario: {itinerarios.tipoItinerario}
                </Typography>
            </Box>
      );
    }

    // Sino realizo un mapeo
    return (
      <div>
        {itinerarios.map((itinerario: any) => (
            <Box  key={itinerario}>
                <Divider><FiberManualRecordIcon></FiberManualRecordIcon></Divider>
                <Typography className="datos-asociados" variant="body2" color="textSecondary">
                    Salida: {itinerario.codAeroSalida}
                </Typography>
                <Typography className="datos-asociados" variant="body2" color="textSecondary">
                    Llegada: {itinerario.codAeroLlegada}
                </Typography>
                <Typography className="datos-asociados" variant="body2" color="textSecondary">
                    Hora Salida: {formatearFecha(itinerario.horaSalida)}
                </Typography>
                <Typography className="datos-asociados" variant="body2" color="textSecondary">
                    Hora Llegada: {formatearFecha(itinerario.horaLlegada)}
                </Typography>
                <Typography className="datos-asociados" variant="body2" color="textSecondary">
                    Aterrizajes: {itinerario.cantAterrizajes}
                </Typography>
                <Typography className="datos-asociados" variant="body2" color="textSecondary">
                    Tipo itinerario: {itinerario.tipoItinerario}
                </Typography>
                
            </Box>
        ))}
      </div>
    );
  };

  // Si el vuelo fue sin instructor entonces no se muestra en la card.
  function mostrarInstructor () {
    if (datosRecibo.instructor !== "") {
      return (
        <Typography className="datos-asociados" variant="body2" color="text.secondary">
              Instructor: {datosRecibo.instructor}
        </Typography>
      );
    }
    else {
      return (null);
    }
  }

  return (
  <div className="card">
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography className="datos-asociados" variant="body2" color="text.secondary">
            Asociado: {datosRecibo.asociado}
          </Typography>
          {mostrarInstructor ()}
          <Typography className="datos-asociados" variant="body2" color="text.secondary">
            Gestor: {datosRecibo.gestor}
          </Typography>
          <Typography className="datos-asociados" variant="body2" color="text.secondary">
            Matricula: {datosRecibo.matricula}
          </Typography>
          <Typography className="datos-asociados" variant="body2" color="text.secondary">
            Precio total: $ {datosRecibo.precioTotal}
          </Typography>
          <Typography className="datos-asociados" variant="body2" color="text.secondary">
            Observaciones: {datosRecibo.observaciones}  
          </Typography>
          <Typography className="datos-asociados" variant="h6" color="text.secondary">
            Itinerarios
          </Typography>
          <Box>
            {listaItinerarios()}
          </Box>
        </CardContent>
      </Card>
    </div>
  )
}

export { CardVerReciboVuelo };

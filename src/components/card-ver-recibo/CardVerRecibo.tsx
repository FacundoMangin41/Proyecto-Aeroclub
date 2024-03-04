import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "./CardVerRecibo.css";


function CardVerRecibo(datos_recibo: any) {

  const recibo = datos_recibo.datos[0];
  
  return (
  <div className="card">
      <Card className='cardVerRecibo'>
        <CardContent>
          <Typography className="datos-asociados" variant="body2" color="text.secondary">
            Asociado: {recibo.asociado}
          </Typography>
          
          <Typography className="datos-asociados" variant="body2" color="text.secondary">
            Fecha: {recibo.fecha}
          </Typography>
          <Typography className="datos-asociados" variant="body2" color="text.secondary">
            Monto: ${recibo.monto}
          </Typography>
          <Typography className="datos-asociados" variant="body2" color="text.secondary">
            Motivo: {recibo.motivo}
          </Typography>
          <Typography className="datos-asociados" variant="body2" color="text.secondary">
            Tipo de pago: {recibo.tipo_pago_id}  
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export { CardVerRecibo };

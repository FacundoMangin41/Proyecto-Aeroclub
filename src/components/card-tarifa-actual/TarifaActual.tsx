import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "./tarifa-actual.css";

export default function TarifaActual() {
    const valorTarifa = 35;
    const lubricante = 10;
    const combustible = 20;
    const inspeccion = 5;
  return (
    <Card className="card-tarifa-actual">
      <CardContent>
        <Typography variant="h5" component="div">
          Tarifa Actual:
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          $ {valorTarifa}
        </Typography>
        <Typography variant="body2">
          Lubricante: ${lubricante}
          <br />
          Combustible: ${combustible}
          <br />
          Inspección: ${inspeccion}
        </Typography>
      </CardContent>
    </Card>
  );
}

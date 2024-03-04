import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "./vencimientoCuota.css";

export default function VencimientoCMA() {
    const mes = "Diciembre";
  return (
    <Card className="card-cuota">
      <CardContent>
        <Typography variant="h5" component="div">
          Ultima cuota paga:
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {mes}
        </Typography>
      </CardContent>
    </Card>
  );
}

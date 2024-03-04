import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "./vencimientoCMA.css";

export default function VencimientoCMA() {
    const dias = 126;
  return (
    <Card className="card-vencimiento-cma">
      <CardContent>
        <Typography variant="h5" component="div">
          Dias para vencimiento de CMA:
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {dias}
        </Typography>
      </CardContent>
    </Card>
  );
}

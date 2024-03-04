import "./condicionPista.css";
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function CondicionPista() {
    const aeroclub = "Habilitado";
    const disponibilidad = "Disponible"
  return (
    <Card className="card-condicion-pista">
      <CardContent>
        <Typography variant="h5" component="div">
          Aeroclub {aeroclub}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Pista {disponibilidad}
        </Typography>
      </CardContent>
    </Card>
  );
}

// function CondicionPista (){
//     const condicion = true;
//     return(
//         <Box className="container-condicion-pista"
//         sx={{
//             display: "flex",
//             flexDirection: "column",
//             gap: 2,
//             textAlign: "center",
//             width: "fit-content",
//             height: "fit-content",
//             backgroundColor: "white"
//           }}
//           >
//             {condicion === true ? (
//                 <>
//                 <Typography variant="h5" component="p">
//                     Aeroclub Habilitado -
//                 </Typography>
//                 <Typography variant="h5" component="p">
//                     Pista en condiciones
//                 </Typography>
//                 </>
//             ):(
//                 <>
//                 <Typography variant="h5" component="p">
//                     Aeroclub Deshabilitado
//                 </Typography>
//                 <Typography variant="h5" component="p">
//                     Pista no disponible
//                 </Typography>
//                 </>
//             )}
//         </Box>
//     );
// }

// export default CondicionPista;
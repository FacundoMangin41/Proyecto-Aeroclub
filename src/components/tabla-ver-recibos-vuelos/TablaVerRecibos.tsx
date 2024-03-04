import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  GridRowsProp,
  GridRowModesModel,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  esES,
} from "@mui/x-data-grid";
import { Modal } from "@mui/material";
import { useState, useEffect } from "react";

import { apiReciboVuelos } from "../../services/apiReciboVuelos";

import { CardVerReciboVuelo } from "../card-ver-recibo-vuelo/CardVerReciboVuelo";
import { apiEnviarRecibo } from "../../services/apiEnviarRecibo";
import Swal from "sweetalert2";

const theme = createTheme(
  {
    palette: {
      primary: { main: "#1976d2" },
    },
  },
  esES
);
const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TablaRecibosVuelos() {

  // ************************************************************************************
  //                                    Manejo de la api
  // ************************************************************************************
  const [rows, setRows] = useState<GridRowsProp>([]);
  const fetchData = async () => {
    try {
      const response = await apiReciboVuelos.get();
      let i = 0;
      // Mapeo la respuesta de la api y la convierto a un array de objetos que se usara para cargar la tabla
      const resultado = response.respuesta.map((recibo: any) => {
        const reciboFormateado = {
          id: i,
          asociado: recibo[0].asociado,
          gestor: recibo[0].gestor,
          numRecibo: recibo[0].numRecibo,
          instructor: recibo[0].instructor,
          matricula: recibo[0].matricula,
          observaciones: recibo[0].observaciones,
          precioTotal: recibo[0].precioTotal,
          itinerarios: recibo.slice(1), // Utiliza slice para obtener todos los elementos a partir de la posición 1
        };
        i = i + 1;
        return reciboFormateado;
      });
      setRows(resultado);
    } catch (error: any) {
      // console.log(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  },[]);

  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  // Utilizo este estado para almacenar la informacion que se renderiza en el modal
  const [verRecibo, setVerRecibo] = useState({});

  // ************************************************************************************
  //                      Manejo del modal para ver un asociado
  // ************************************************************************************
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    setVerRecibo({});
  };

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleVerClick = (id: GridRowId) => () => {
    setVerRecibo(rows.filter((row) => row.id === id));
    setOpen(true);
  };
  
  const handleDescargarClick = (id: GridRowId) => () => {
    setVerRecibo(rows.filter((row) => row.id === id));
    Swal.fire({
      title: `¿Desea enviar el recibo al E-Mail del asociado: ${rows.filter((row) => row.id === id)[0].asociado}?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Enviar",
      denyButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        apiEnviarRecibo.get(rows.filter((row) => row.id === id)[0].numRecibo);
      } else if (result.isDenied) {
        Swal.fire("Has cancelado el envio", "", "info");
      }
    });
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  // Columnas de la tabla
  const columns: GridColDef[] = [
    {
      field: "asociado",
      headerName: "Asociado",
      width: 200,
      type: "string",
    },
    {
      field: "gestor",
      headerName: "Gestor",
      type: "string",
      width: 100,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "instructor",
      headerName: "Instructor",
      width: 250,
      type: "string"
    },
    {
      field: "matricula",
      headerName: "Matricula",
      width: 170,
      type: "string",
    },
    {
      field: "observaciones",
      headerName: "Observaciones",
      width: 170,
      type: "string",
    },
    {
      field: "precioTotal",
      headerName: "Precio Total",
      type: "number",
      width: 100,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<VisibilityIcon />}
            label="Ver mas"
            className="textPrimary"
            onClick={handleVerClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<EmailIcon />}
            label="Descargar recibo"
            className="textPrimary"
            onClick={handleDescargarClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <ThemeProvider theme={theme}>
        <DataGrid
          rows={rows}
          getRowId={(rows) => rows?.id}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          // slots={{
          //   toolbar: EditToolbar,
          // }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
      </ThemeProvider>
      {/* Modal para ver informacion de un recibo */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <CardVerReciboVuelo datos={verRecibo} />
        </Box>
      </Modal>
    </Box>
  );
}

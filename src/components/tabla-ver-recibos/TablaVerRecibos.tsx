import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
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


import { CardVerRecibo } from "../card-ver-recibo/CardVerRecibo";
import { apiTransacciones } from "../../services/apiTransacciones";
import formatearFecha from "../../functions/formatearFecha/formatearFecha";
import "./TablaVerRecibos.css";

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
  bgcolor: "var(--fondo)",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

export default function TablaRecibos() {

  // ************************************************************************************
  //                                    Manejo de la api
  // ************************************************************************************
  const [rows, setRows] = useState<GridRowsProp>([]);
  const fetchData = async () => {
    try {
      const response = await apiTransacciones.get();
      // Mapeo la respuesta de la api y la convierto a un array de objetos que se usara para cargar la tabla
      const resultado = response.map((recibo: any) => {
        const reciboFormateado = {
          id: recibo.id_transacciones,
          asociado: recibo.nombre_completo_usuario,
          fecha: formatearFecha(recibo.fecha),
          monto: recibo.monto,
          motivo: recibo.motivo,
          tipo_pago_id: recibo.tipo_pago_id
        };
        return reciboFormateado;
      });
      setRows(resultado);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchData();
    // console.log(rows);
  },[]);

  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  // Utilizo este estado para almacenar la informacion que se renderiza en el modal
  const [verRecibo, setVerRecibo] = useState({});

  // ************************************************************************************
  //                      Manejo del modal para ver un recibo
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
      field: "fecha",
      headerName: "Fecha",
      width: 170,
      type: "string",
    },
    {
      field: "motivo",
      headerName: "Motivo",
      width: 170,
      type: "string",
    },
    {
    field: "tipo_pago_id",
    headerName: "Tipo Pago",
    width: 170,
    type: "string",
      },
    {
      field: "monto",
      headerName: "Monto",
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
          />
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
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
        <Box className="modalVerRecibos" sx={modalStyle}>
          <CardVerRecibo datos={verRecibo} />
        </Box>
      </Modal>
    </Box>
  );
}

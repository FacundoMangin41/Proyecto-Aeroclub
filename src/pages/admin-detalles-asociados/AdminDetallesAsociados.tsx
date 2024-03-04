import "./AdminDetallesAsociados.css";
import { CardMostrarAsociados } from "../../components/card-mostrar-asociados/CardMostrarAsociados";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import React from "react";
import { apiUsuarios } from "../../services/apiUsuarios";

function AdminDetallesAsociados (props:any) {
  const datosAsociado = props.datos[0];
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleEditarClick = () => {
    navigate("/admin-editar-usuarios", { state: { asociado: datosAsociado }, replace: true });
  };

  const handleDeleteClick = () => {
    setOpenDialog(true);
  };
  // Manejo del Dialog para confirmar borrado desde la tabla
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleConfirmDialog = async () => {
    try {
    await apiUsuarios.deleteUserByEmail(datosAsociado.email);
    } catch (error:any) {
      console.log(error.message);
    }
    setOpenDialog(false);
  };


  return (
    <div className="detallesAsociadosContainer">
      <CardMostrarAsociados asociado={datosAsociado}></CardMostrarAsociados>
      <div className="detallesAsociadosContainerButtons">
      <Button onClick={handleEditarClick} size="small">Editar asociado</Button>
      <Button onClick={handleDeleteClick} sx={{color: "red"}} size="small">Borrar asociado</Button>
      </div>
      {/* Dialogo para confirmar borrado */}
      <>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>¿Estas seguro de borrar el asociado?</DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button onClick={handleConfirmDialog}>Confirmar</Button>
          </DialogActions>
        </Dialog>
      </>
    </div>
  );
}

export default AdminDetallesAsociados;

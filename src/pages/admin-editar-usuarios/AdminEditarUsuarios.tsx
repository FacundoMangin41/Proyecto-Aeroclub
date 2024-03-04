import "./AdminEditarUsuarios.css";
import FormEditUsuario from "../../components/form-edit-usuario/FormEditUsuario";
import { useLocation } from "react-router-dom";

function AdminEditarUsuarios(props:any) {
  // Recibo los datos del asociado y los asigno a una variable
  const location = useLocation();
  const datosAsociado = location.state?.asociado;

  // La forma de enviar datos a este componente es:
  // El prop es "asociado" y datosAsociado los datos a enviar
  // navigate("/admin-editar-usuarios", { state: { asociado: datosAsociado }, replace: true });
 
  return (
    <div className='editar-usuarios'>
      <div className="edicionDeUsuarios">
        <FormEditUsuario datosAsociado={datosAsociado}></FormEditUsuario>
      </div>
    </div>
  );
}

export default AdminEditarUsuarios;

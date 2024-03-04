import { Route, Routes } from "react-router-dom";
import Inicio from "../pages/inicio/Inicio";
import { Layout } from "../components/layout/Layout";
import PanelAdministradores from "../pages/panel-administradores/PanelAdministradores";
import AdminAdministrarUsuarios from "../pages/admin-administrar-usuarios/AdminAdministrarUsuarios";
import AdminEditarUsuarios from "../pages/admin-editar-usuarios/AdminEditarUsuarios";
import AdminDetallesAsociados from "../pages/admin-detalles-asociados/AdminDetallesAsociados";
import PanelAsociados from "../pages/panel-asociados/PanelAsociados";
import FormEditUsuario from "../components/form-edit-usuario/FormEditUsuario";
import AdminVerRecibos from "../pages/admin-ver-recibos-vuelos/AdminVerRecibos";
import AdminCargarRecibo from "../pages/admin-cargar-recibo/AdminCargarRecibo";
import AdminRegistrarPago from "../pages/admin-registrar-pago/AdminRegistrarPago";
import AdminVerTransacciones from "../pages/admin-ver-transacciones/AdminVerTransacciones";
import CargaUsuarios from "../pages/carga-usuarios/CargaUsuarios";
import AdminCargarCombustible from "../pages/admin-cargar-recibo-combustible/AdminCargarCombustible";
import CargaUsuariosNuevos from "../pages/carga-usuarios-nuevos/CargaUsuariosNuevos";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Inicio />}></Route>
          
          <Route
            path="panel-administrador"
            element={<PanelAdministradores />}
            />

          <Route 
            path="panel-asociado"
            element={<PanelAsociados />} 
            />

          <Route
            path="admin-administrar-usuarios"
            element={<AdminAdministrarUsuarios />}
          />

          <Route
            path="admin-editar-usuarios"
            element={<AdminEditarUsuarios />}
          />

          <Route
            path="/admin-ver-recibos-vuelos"
            element={<AdminVerRecibos />}
          ></Route>

          <Route
            path="/admin-ver-recibos"
            element={<AdminVerTransacciones />}
          ></Route>

          <Route
            path="/admin-cargar-recibos-vuelos"
            element={<AdminCargarRecibo />}
          ></Route>

          <Route
            path="/admin-registrar-pago"
            element={<AdminRegistrarPago />}
          ></Route>

          <Route
            path="/admin-cargar-recibos-combustible"
            element={<AdminCargarCombustible />}
          ></Route>

          <Route 
            path="/cargar-usuario" 
            element={<CargaUsuarios />}
          ></Route>

          <Route 
            path="/cargar-usuario-nuevo" 
            element={<CargaUsuariosNuevos></CargaUsuariosNuevos>}
          ></Route>
          
        </Route>
        <Route path="/inicio" element={<Inicio />} />
      </Routes>
    </>
  );
};

//<Route path="sign-in" element={<SignIn />} />

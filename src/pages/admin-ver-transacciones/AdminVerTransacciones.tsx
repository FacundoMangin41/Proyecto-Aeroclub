import TablaVerRecibos from "../../components/tabla-ver-recibos/TablaVerRecibos";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { resolverToken } from "../../api/apiCalls";
import { apiRoles } from "../../services/apiRoles";

function AdminVerTransacciones() {
  const navigate = useNavigate();

  async function checkTokenAndRol() {
    const getTokenLocal = await localStorage.getItem("token");
    const [roles, setRoles] = useState<string[]>([]);
    setRoles(await apiRoles.get(localStorage.getItem("email")));
    

    if (getTokenLocal == "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Sin autorización, no tenes iniciada sesión",
        position: 'center'
      });
      navigate("/", { replace: true });
    }

    try {
      const resResolverToken = await resolverToken();

      if (resResolverToken.success) {

        if (!roles.includes("Gestor")) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El usuario no posee el rol de gestor para acceder",
            position: 'center'
          });

          navigate("/", { replace: true });
        } else {
          // console.log(resResolverToken.dataToken);
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Un error inesperado",
        position: 'center'
      });
    }
  }

  useEffect(() => {
    checkTokenAndRol().then(() => {
      // console.log("se cumplio");
    });
  }, []);

  return (
    <div className="panelAdminContainer">
      <div className="panelAdminVerRecibos">
        <h1 className="panelAdminTitle">Recibos</h1>
        <TablaVerRecibos></TablaVerRecibos>
      </div>
    </div>
  );
}

export default AdminVerTransacciones;

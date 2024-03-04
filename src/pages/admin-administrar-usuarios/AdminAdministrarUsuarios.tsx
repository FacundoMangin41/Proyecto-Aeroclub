import { TablaAdminUsuarios } from "../../components/tablaAdminUsuarios/TablaAdminUsuarios";
import { useTablaAdminUsuarios } from "../../hooks/useTablaAdminUsuarios";
import "./AdminAdministrarUsuarios.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { resolverToken } from "../../api/apiCalls";
import { apiRoles } from "../../services/apiRoles";

function AdminAdministrarUsuarios() {
  const {
    toggleColors,
    usuarios,
    showColors,
    handleChangeSort,
    sortedUsuarios,
    setInvertir,
    invertir,
  } = useTablaAdminUsuarios();

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
          });

          navigate("/", { replace: true });
        } else {
          console.log(resResolverToken.dataToken);
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Un error inesperado",
      });
    }
  }

  useEffect(() => {
    checkTokenAndRol().then(() => {
      console.log("se cumplio");
    });
  }, []);

  return (
    <div className="panelAdminContainer">
      <h1 className="panelAdminTitle">Administrar Usuarios</h1>
      {usuarios.length > 0 && (
        <TablaAdminUsuarios
          changeSorting={handleChangeSort}
          showColors={showColors}
          usuarios={sortedUsuarios}
          setInvertir={setInvertir}
          invertir={invertir}
        />
      )}
    </div>
  );
}

export default AdminAdministrarUsuarios;

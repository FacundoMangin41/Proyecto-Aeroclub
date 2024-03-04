import { SortByTablaAdminUsuarios, Usuarios } from "../../types.d";
import "./TablaAdminUsuarios.css";
import { useNavigate } from "react-router-dom";

interface Props {
  changeSorting: (sort: SortByTablaAdminUsuarios) => void;
  showColors: boolean;
  usuarios: Usuarios[];
  setInvertir: any;
  invertir: boolean;
}

export function TablaAdminUsuarios({
  changeSorting,
  showColors,
  usuarios,
  setInvertir,
  invertir,
}: Props) {
  const navigate = useNavigate();

  return (
    <table className="tablaAscociadosAdmin">
      <thead className="tablaAsociadosAdminEncabezado">
        <tr>
          <th className="tablaAsociadosAdminCabecera">Avatar</th>
          <th
            className="tablaAsociadosAdminCabecera"
            onClick={() => {
              setInvertir(!invertir);
              changeSorting(SortByTablaAdminUsuarios.DNI);
            }}
          >
            DNI
          </th>
          <th
            className="tablaAsociadosAdminCabecera"
            onClick={() => {
              setInvertir(!invertir);
              changeSorting(SortByTablaAdminUsuarios.NOMBRE);
            }}
          >
            Nombre
          </th>
          <th
            className="tablaAsociadosAdminCabecera"
            onClick={() => {
              setInvertir(!invertir);
              changeSorting(SortByTablaAdminUsuarios.MAIL);
            }}
          >
            Mail
          </th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody className={showColors ? "table--showColors" : ""}>
        {usuarios.map((usuario) => {
          return (
            <tr key={usuario.email}>
              <td>{usuario.fotoPerfil}</td>
              <td>{usuario.dni}</td>
              <td>{usuario.nombre + " " + usuario.apellido}</td>
              <td>{usuario.email}</td>

              <td>
                <div className="containerActionButtons">
                  <button
                    className="tablaAsociadosButton"
                    onClick={() => {
                      navigate("/admin-editar-usuarios", { replace: true });
                      console.log("Ir a ver mas");
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="tablaAsociadosButton"
                    onClick={() => {
                      console.log("Ir a Roles");
                    }}
                  >
                    Roles
                  </button>
                  <button
                    className="tablaAsociadosButton"
                    onClick={() => {
                      console.log("Ir a ver mas");
                    }}
                  >
                    Eliminar
                  </button>
                  <button
                    className="tablaAsociadosButton"
                    onClick={() => {
                      navigate("/admin-detalles-asociados", { replace: true });
                      console.log("Ir a ver mas");
                    }}
                  >
                    Detralles
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

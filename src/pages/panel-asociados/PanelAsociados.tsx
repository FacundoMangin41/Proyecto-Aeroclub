import "./PanelAsociados.css";
import TablaTurnosPanelAsociados from "../../components/tablaTurnosPanelAsociados/TablaTurnosPanelAsociados";
import { CardClima } from "../../components/card-clima/CardClima";
import CondicionPista from "../../components/condicion-pista/CondicionPista";
import TarifaActual from "../../components/card-tarifa-actual/TarifaActual";
import SaldoActual from "../../components/card-saldo-actual/SaldoActual";
import VencimientoCMA from "../../components/card-vencimiento-cma/VencimientoCMA";
import VencimientoCuota from "../../components/card-vencimiento-cuota/VencimientoCuota";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { resolverToken } from "../../api/apiCalls";
import { apiRoles } from "../../services/apiRoles";
import TablaRecibosUsuario from "../../components/tabla-transacciones-usuario/TablaRecibosUsuario";

function PanelAsociados() {
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

        if (!roles.includes("Asociado")) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El usuario no posee el rol de Asociado para acceder",
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
      });
    }
  }

  useEffect(() => {
    checkTokenAndRol().then(() => {
      // console.log("se cumplio");
    });
  }, []);

  return (
    <div className="panelAsociadoContainer">
        <div className="panelAsociadoContainerSaldo">
          <SaldoActual></SaldoActual>
        </div>
        <div className="panelVerMovimientos"> 
          <h1 className="panelAdminTitle">Movimientos</h1>
        <div className="tablaTransaccionesAsociados">
          <TablaRecibosUsuario/>
        </div>
        </div>

      {/* <div className="filaPanelAsociado">
        <TarifaActual></TarifaActual>
        <CondicionPista />
      </div> */}
      
        {/* <div className="filaPanelAsociado">
          <VencimientoCuota></VencimientoCuota>
          <VencimientoCMA></VencimientoCMA>
        </div>
      

      <div className="colorTablaPanelAsociado">
        <div className="TablaTurnos">
          <TablaTurnosPanelAsociados />
        </div>
      </div> */}
    </div>
  );
}

export default PanelAsociados;

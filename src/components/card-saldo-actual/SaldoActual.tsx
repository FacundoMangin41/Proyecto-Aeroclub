import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "./saldo-actual.css"
import { apiCuentaCorriente } from '../../services/apiCuentaCorriente';
import { useEffect, useState } from 'react';
import { apiUsuarios } from '../../services/apiUsuarios';
import  banner  from "../../assets/images/banner.png";

export default function SaldoActual() {
  const [saldo, setSaldo] = useState<number | null>(null);

  const getSaldo = async () => {
    try {
      // console.log(localStorage.getItem("email"));
      const email = await apiUsuarios.getUserByEmail(localStorage.getItem("email") as string)
      const response = await apiCuentaCorriente.getById(email.respuesta.id_usuarios);
      // Parsea la respuesta a un entero y actualiza el estado
      setSaldo(parseInt(response) || 0); // Si no se puede parsear, establece el saldo en 0
      // console.log(saldo);
    } catch (error: any) {
      console.log(error.message);
      setSaldo(null); // Manejo de error, establece el saldo en null
    }
  };

  useEffect(() => {
    getSaldo();
  }, []);

  return (
  // <section className="containerInformacionPanelControl">
  //   <div className="informacionPanelControl">
  //     <div className="textoInformacionPanelControl">
  //         <h1>Su saldo es:</h1>
  //         <p> $ {saldo !== null ? saldo : "Cargando..."} {/* Muestra "Cargando..." mientras se obtiene el saldo */}</p>
  //     </div>
  //   </div>
  // </section>

  <section className="containerInformacionPanelControl">
    <h1>¡Bienvenido!</h1>
    <p>{`${localStorage.getItem("nombre")}`}</p>
    <div className="informacionPanelControl">
      <img src={localStorage.getItem("avatar")} alt="" />
      <div className="textoInformacionPanelControl">
          <h1>Su saldo es:</h1>
          <p> $ {saldo !== null ? saldo : "Cargando..."} {/* Muestra "Cargando..." mientras se obtiene el saldo */}</p>
      </div>
    </div>
  </section>

  );
}

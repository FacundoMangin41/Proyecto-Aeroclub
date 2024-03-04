import "./aeronaversAlertaPanelAdmin.css";
import { apiAeronaves } from "../../services/apiAeronaves";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import imagen from "../../assets/images/banner.png";

export function AeronaversAlertaPanelAdmin() {

  return (
    <div className="mostrarAeronavesContainer">
      <article id="tarjetaAeronave">
          <div className="nombreAeronave" >
            <img src={imagen} alt="" />
            <div>
                <h2>Nombre Aeronave</h2>
                <p>Matricula</p>
            </div>
            <div className="estado">
              <h4>Habilitado</h4>
            </div>
          </div>
        </article>
        <article id="tarjetaAeronave">
          <div className="nombreAeronave" >
            <img src={imagen} alt="" />
            <div>
                <h2>Nombre Aeronave</h2>
                <p>Matricula</p>
            </div>
            <div className="estado">
              <h4>Deshabilitado</h4>
            </div>
          </div>
        </article>
        
    </div>
  );
}

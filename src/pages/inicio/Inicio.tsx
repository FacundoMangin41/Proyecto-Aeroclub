import React from "react";
import Banner from "../../components/landing-page-components/banner/Banner";
import Informacion from "../../components/landing-page-components/informacion/Informacion";
import Contacto from "../../components/landing-page-components/contacto/Contacto";
import "./inicio.css";
import { useEffect } from "react";
import { gapi } from "gapi-script";

const Inicio = () => {
  const clientId = import.meta.env.VITE_CLIENT_ID;

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  return (
    <div className="home-page">
      <div className="banner-landing-page">
        <Banner></Banner>
        <Informacion></Informacion>
        <Contacto></Contacto>
      </div>
    </div>
  );
};

export default Inicio;

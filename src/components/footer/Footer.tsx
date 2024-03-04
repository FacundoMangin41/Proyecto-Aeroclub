import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import "./Footer.css";

function Footer() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="footerContainer">
        {/* <p className="footerDerechos">
          © 2023 Aero Club Lincoln.
          <br></br>
          Todos los derechos reservados.
        </p> */}
        <div className="horarios">
          <h3 className="titulo">Horario</h3>
          <p className="texto-horario"><span className="resaltar">Lunes</span> a <span className="resaltar">Viernes:</span> xxhs a xxhs</p>
          <p className="texto-horario"><span className="resaltar">Sabados:</span> xxhs a xxhs</p>
          <p className="texto-horario"><span className="resaltar">Domingos:</span> xxhs a xxhs</p>
        </div>
        <img
          className="footerLogo"
          src="https://drive.google.com/uc?export=view&id=19U8BFR2N0VfapOWtSvoiRSsXvOc6iVdH"
          alt="Logo Aero club Lincoln"
        />
        <div className="footerRedesContainer">
          <TwitterIcon className="bi bi-twitter-x"/>
          <FacebookIcon className="bi bi-facebook"/>
          <InstagramIcon className="bi bi-instagram"/>
          <WhatsAppIcon className="bi bi-whatsapp"/>
        </div>
      </div>
      {/* <div className="derechos-de-autor">
        <p>© Copyright | 2023 | Todos los derechos reservados</p>
      </div> */}
    </div>
  );
}

export { Footer };

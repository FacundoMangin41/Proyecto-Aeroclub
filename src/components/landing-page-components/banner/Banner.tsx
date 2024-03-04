import React from 'react';
import './banner.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Typography } from '@mui/material';

import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';


const Banner = () => {
    
    return (
    <header>   
        <section className="textos-header">
            <div className="textos-banner">
                <Typography id="header-titulo">Aeroclub Lincoln</Typography>
                {/* <Typography className="header-subtitulo" >Redes sociales</Typography> */}
                <div className="iconos">
                    <TwitterIcon className="bi bi-twitter twitter"/>
                    <FacebookIcon className="bi bi-facebook facebook"/>
                    <InstagramIcon className="bi bi-instagram instagram"/>
                    <WhatsAppIcon className="bi bi-whatsapp whatsapp"/>
                </div>
            </div>
        </section>
  </header>
    );
};

export default Banner;
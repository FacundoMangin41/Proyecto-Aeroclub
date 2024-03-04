import React from 'react';
import './contacto.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const Contacto = () => {
    return (
        // <div className="contacto">
        //     <div className="container container-contacto">
        //         <h3 className="titulo">Contacto</h3>
        //         <div className="iconos">
        //             <div className="fila-iconos">
        //                 {/* <!-- Twitter/ X --> */}
        //                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="bi bi-twitter-x" viewBox="0 0 16 16">
        //                     <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/>
        //                 </svg>
        //                 {/* <!-- Facebook --> */}
        //                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="bi bi-facebook" viewBox="0 0 16 16">
        //                     <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
        //                 </svg>
        //             </div>
        //             <div className="fila-iconos">
        //                 {/* <!-- Icono Instagram --> */}
        //                 <i className="fa fa-instagram" id="insta" aria-hidden="true"></i>
        //                 {/* <!-- Icono WhatsApp --> */}
        //                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="bi bi-whatsapp" viewBox="0 0 16 16">
        //                     <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
        //                 </svg>
        //             </div>
        //         </div>
        //     </div>
        //     <div className="container container-contacto">
        //         <h3 className="titulo">Ubicación</h3>
        //         <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3272.8240087078457!2d-61.53565848255615!3d-34.8857654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95c744bf6daa3221%3A0x9664f190883cf985!2sAeroclub%20Lincoln!5e0!3m2!1ses-419!2sar!4v1698345205217!5m2!1ses-419!2sar" 
        //             // style="border:0;" 
        //             // allowfullscreen="" 
        //             // loading="lazy" 
        //             // referrerpolicy="no-referrer-when-downgrade"
        //             >
        //         </iframe>
        //     </div>
        //     <div className="container container-contacto">
                // <h3 className="titulo">Horario</h3>
                // <p className="texto"><span className="resaltar">Lunes</span> a <span className="resaltar">Viernes</span>: xxhs a xxhs</p>
                // <p className="texto"><span className="resaltar">Sabados</span>: xxhs a xxhs</p>
                // <p className="texto"><span className="resaltar">Domingos</span>: xxhs a xxhs</p>
        //     </div>
        // </div>

        <section className="container-ubicacion">
            <div className="informacion-ubicacion">
                <div className="texto-ubicacion">
                    <h1>Ubicación</h1>
                    <p>Lincoln es fácilmente accesible desde todas las direcciones. Ya sea que vengas desde el norte, sur, este u oeste, encontrarás rutas convenientes que te conducirán directamente a nuestras puertas. 
                            La proximidad a las principales autopistas y vías de transporte público hace que llegar a nuestro rincón sea sencillo y conveniente.</p>
                </div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3272.8240087078457!2d-61.53565848255615!3d-34.8857654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95c744bf6daa3221%3A0x9664f190883cf985!2sAeroclub%20Lincoln!5e0!3m2!1ses-419!2sar!4v1698345205217!5m2!1ses-419!2sar" />
                        
            </div>
        </section>
    );
};

export default Contacto;
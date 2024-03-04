import React from 'react';
import './informacion.css';
import imagen  from "../../../assets/images/banner.png";
import banner2  from "../../../assets/images/banner2.png";
import banner3  from "../../../assets/images/banner3.png";
import banner4  from "../../../assets/images/banner4.png";
import { CardClima } from '../../card-clima/CardClima';

const Informacion = () => {
    return (
        // <Container maxWidth="md" className="informacion">
        //     <Box maxWidth="md" className="container-informacion">
        //         <p className="texto">Lorem ipsum dolor sit amet, consectetur adipiscing elit.  
        //             Curabitur nec turpis commodo, malesuada odio ut, lobortis enim. 
        //             Aenean eu turpis at justo ultricies fringilla. 
        //             Phasellus sit amet orci aliquet libero posuere finibus.</p>
        //         <img className="image" src="../assets/images/banner2.png" alt="example"/>
        //     </Box>
        //     <Divider><AdjustIcon/></Divider>
        //     <Box maxWidth="md" className="container-informacion">
        //         <p className="texto">Lorem ipsum dolor sit amet, consectetur adipiscing elit.  
        //             Curabitur nec turpis commodo, malesuada odio ut, lobortis enim. 
        //             Aenean eu turpis at justo ultricies fringilla. 
        //             Phasellus sit amet orci aliquet libero posuere finibus.</p>
        //         <img className="image" src="../assets/images/example.png" alt="example"/>
        //     </Box>
        //     <Divider><AdjustIcon/></Divider>
        //     <Box maxWidth="md" className="container-informacion">
        //         <p className="texto">Lorem ipsum dolor sit amet, consectetur adipiscing elit.  
        //             Curabitur nec turpis commodo, malesuada odio ut, lobortis enim. 
        //             Aenean eu turpis at justo ultricies fringilla. 
        //             Phasellus sit amet orci aliquet libero posuere finibus.</p>
        //         <img className="image" src="../assets/images/example.png" alt="example"/>
        //     </Box>
        //     <Divider><AdjustIcon/></Divider>
        //     <Box maxWidth="md" className="container-informacion">
        //         <p className="texto">Lorem ipsum dolor sit amet, consectetur adipiscing elit.  
        //             Curabitur nec turpis commodo, malesuada odio ut, lobortis enim. 
        //             Aenean eu turpis at justo ultricies fringilla. 
        //             Phasellus sit amet orci aliquet libero posuere finibus.</p>
        //         <img className="image" src="../assets/images/example.png" alt="example"/>
        //     </Box>
        // </Container>

            <section className="container-informacion">

                <div className="informacion">
                <CardClima></CardClima>
                    <div className="texto-informacion">
                        <h1>Clima en el Aeropuerto Lincoln en Tiempo Real</h1>
                        <p> Muestra los datos meteorológicos más recientes para proporcionarte información precisa sobre las condiciones 
                            climáticas en el Aeropuerto Lincoln. Desde la temperatura actual hasta la velocidad del viento y la visibilidad, 
                            tendrás todos los detalles que necesitas al alcance de tus dedos.</p>
                    </div>

                </div>

                <div className="informacion">
                    <div className="texto-informacion">
                        <h1>Explorando los Cielos</h1>
                        <p>Bienvenidos a Lincoln, donde los sueños despegan y la pasión por la aviación se convierte en realidad. 
                            En nuestro rincón dedicado al fascinante mundo de las aeronaves y 
                            los vuelos, hemos creado un espacio vibrante para los entusiastas y aquellos que buscan explorar los cielos.</p>
                    </div>
                    <img src= {imagen} alt="" />
                </div>

                <div className="informacion">
                    <img className='imagen-informacion' src= {banner2} alt="" />
                    <div className="texto-informacion">
                        <h1>Aeronaves Modernas y Versátiles</h1>
                        <p>En Lincoln, contamos con una flota de aeronaves modernas y versátiles que abarcan desde aviones ligeros ideales para la formación de 
                            pilotos hasta aeronaves más avanzadas para aquellos que buscan desafíos mayores. 
                            Cada máquina ha sido seleccionada cuidadosamente para ofrecer una experiencia de vuelo segura y emocionante.</p>
                    </div>

                </div>

                <div className="informacion">
                    <div className="texto-informacion">
                        <h1>Lecciones de Vuelo Personalizadas</h1>
                        <p>Nuestro compromiso con la excelencia se refleja en nuestras lecciones de vuelo personalizadas. 
                            Ya sea que estés dando tus primeros pasos en el mundo de la aviación o buscando perfeccionar tus habilidades, nuestros instructores altamente 
                            capacitados te guiarán a través de un programa de formación diseñado para adaptarse a tus objetivos y horarios.</p>
                    </div>
                    <img src= {banner3} alt="" />
                </div>

                <div className="informacion">
                    <img className='imagen-informacion' src= {banner4} alt="" />
                    <div className="texto-informacion">
                        <h1>Emoción en el Aire y Más Allá</h1>
                        <p>En Lincoln, entendemos que volar no se trata solo de elevarse en el aire, 
                            sino de experimentar una emoción única y una sensación de libertad. Organizamos eventos y actividades emocionantes, 
                            desde vuelos grupales hasta jornadas de exhibición aérea, 
                            para que nuestros miembros se sumerjan completamente en la magia de la aviación.</p>
                    </div>
                </div>

                <div className="informacion">
                    <div className="texto-informacion">
                        <h1>Servicios de Mantenimiento y Seguridad</h1>
                        <p>La seguridad es nuestra prioridad número uno. Contamos con servicios de mantenimiento de 
                            primer nivel para garantizar que nuestras aeronaves estén en condiciones óptimas en todo momento. Nuestros rigurosos estándares de seguridad y 
                            nuestro compromiso con la excelencia nos distinguen como un lugar donde la confianza y la calidad se encuentran en cada vuelo.</p>
                    </div>
                    <img src= {imagen} alt="" />
                </div>

            </section>
    );
};

export default Informacion;
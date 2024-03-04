import React from 'react';
import CargarUsuario  from "../../components/cargar-usuario/CargarUsuario";
import "./cargaUsuarios.css"

function CargaUsuarios() {
    return (
        <div className='cargar-usuarios'>
            <div className="cargaDeUsuarios">
                <CargarUsuario/>
            </div>
        </div>
    );
};

export default CargaUsuarios;
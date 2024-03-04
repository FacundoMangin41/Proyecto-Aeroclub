import React from 'react';
import "./CargaUsuariosNuevos.css"
import CargarUsuarioNuevo from '../../components/cargar-usuario-nuevo/CargarUsuarioNuevo';

function CargaUsuariosNuevos() {
    return (
        <div className='cargar-usuarios'>
            <div className="cargaDeUsuarios">
            <CargarUsuarioNuevo></CargarUsuarioNuevo>
            </div>
        </div>
    );
};

export default CargaUsuariosNuevos;
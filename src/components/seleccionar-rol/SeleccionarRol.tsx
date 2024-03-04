import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Swal from "sweetalert2";
import { useRecoilState } from "recoil";
import { usuarioEnSesion } from "../../atomos/atoms";
import { useAuthToken } from "../../hooks/useAuthToken";



const SeleccionarRol = () => {
    const [userSesion] = useRecoilState(usuarioEnSesion);
    const [changeSesion, setChangeSesion] = useState(false);
    const [selectedRole, setSelectedRole] = useState("");
  
    const { decodificarToken } = useAuthToken();

  async function buscarUsuario() {
    await decodificarToken();
  }
  
    const handleRoleSelection = (role: any) => {
        if (userSesion.roles.includes(role)) {
          setSelectedRole(role);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El usuario no posee el rol que quiere seleccionar",
          });
          if (selectedRole) {
            setSelectedRole(selectedRole);
          } else {
            setSelectedRole("Usuario");
          }
        }
      };

      useEffect(() => {
        if (userSesion.email != "") {
          setChangeSesion(true);
        } else {
          setChangeSesion(false);
        }
      }, [userSesion]);
    
      console.log("el mail del usuario en sesion: ", userSesion.email);
    
    
      useEffect(() => {
        // Actualizar el estado con el rol almacenado en el local storage al cargar el componente
        buscarUsuario();
      }, []);
    return (
        <div>
            <div className="dropdown rol">
                  Seleccionar rol:
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="roleDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {selectedRole}
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="roleDropdown">
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => handleRoleSelection("Usuario")}
                      >
                        Usuario
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => handleRoleSelection("Asociado")}
                      >
                        Asociado
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => handleRoleSelection("Instructor")}
                      >
                        Instructor
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => handleRoleSelection("Gestor")}
                      >
                        Gestor
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => handleRoleSelection("Mecanico")}
                      >
                        Mecanico
                      </a>
                    </li>
                  </ul>
            </div>
        </div>
         
    );
};

export default SeleccionarRol;


import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import { LoginGoogle } from "../login-google/Login-google";
import { LogoutGoogle } from "../logout-google/Logout-google";
import { useRecoilState } from "recoil";
import { usuarioEnSesion } from "../../atomos/atoms";
import { useAuthToken } from "../../hooks/useAuthToken";
import { apiRoles } from "../../services/apiRoles";

export default function Header() {
  const [userSesion, setUserSesion] = useRecoilState(usuarioEnSesion);
  const [changeSesion, setChangeSesion] = useState(false);
  const [changeRol, setChangeRol] = useState(false);
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("");

  const { decodificarToken } = useAuthToken();

  async function buscarUsuario() {
    await decodificarToken();
  }
  


  // Efecto para decodificar el token cuando el componente se monta

  useEffect(() => {
    if (userSesion.email != "") {
      setChangeSesion(true);
    } else {
      setChangeSesion(false);
    }
  }, [userSesion]);


// ------------------------------------------------------------------------------------------------------------------
//                              Roles
// ------------------------------------------------------------------------------------------------------------------

  useEffect (() => {
    const rolPrevio = localStorage.getItem("rol");
    if (rolPrevio !== "") {
      handleRoleSelection(rolPrevio);
    }
  },[]);

  // console.log("el mail del usuario en sesion: ", userSesion.email);

  const handleRoleSelection = (role: string) => {
    if (roles.includes(role)) {
      setSelectedRole(role);
      localStorage.setItem("rol", role);
    } else {
      if (selectedRole) {
        setSelectedRole(selectedRole);
      } else {
        setSelectedRole("Asociado");
      }
    }
  };

  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    // Se obtienen todos los roles del usuario logeado
    async function fetchRolesAsync() {
      try {
        const response = await apiRoles.get(localStorage.getItem("email"));
        setRoles(response);
      } catch (error) {
        console.error(error);
        setRoles([]);
      }
    }
    // console.log(roles);
    fetchRolesAsync();
  }, []); // Se ejecuta solo al montar el componente

  function seleccionarRol() {
    if (roles == null) {
      return null;
    } else {
      return roles.length > 1 ? (
        <ul className="dropdown-menu" aria-labelledby="roleDropdown">
          {roles.map((rol, index) => (
            <li key={index}>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handleRoleSelection(rol)}
              >
                {rol}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <p>{roles[0]}</p>
        </div>
      );
    }
  }
  
  



  // -------------------------     Gestores                  -----------------------------------------------------------------------------------------
  function navLogueo(){
    if (localStorage.getItem("email") != "") {
      return (
        <>
      <div className="separacion-nav">
        <h5>{`${localStorage.getItem("nombre")}`}</h5>
          <div className="dropdown rol-nav">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="roleDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {selectedRole}
            </button>
            {seleccionarRol()}
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </>
      )
      
    } else {
      return (
        <>
          <div className="login-google-nav-principal">
            {changeSesion ? <LogoutGoogle /> : <LoginGoogle />}
          </div>
        </>
      )
    }

  }



  function funcionGestorNav(){
    if (selectedRole === "Gestor") {
      return(
      <>
      <Divider className="divider" variant="middle" />
      <h4>Usuarios</h4>
      <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
        <li className="nav-item">
          <NavLink to="/cargar-usuario">
            {" "}
            <a className="nav-link">Cargar Usuarios</a>
          </NavLink>
        </li>   
      </ul>

      <Divider className="divider" variant="middle" />
        <h4>Recibos</h4>
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li className="nav-item">
          <li className="nav-item">
            <NavLink to="/admin-registrar-pago">
              {" "}
              <a className="nav-link">Registrar pago</a>
            </NavLink>
          </li>
            <NavLink to="/admin-ver-recibos">
              {" "}
              <a className="nav-link">Ver recibos de pago</a>
            </NavLink>
          </li>
          <p></p>

          <li className="nav-item">
            <NavLink to="/admin-cargar-recibos-vuelos">
              {" "}
              <a className="nav-link">Cargar recibos de vuelo</a>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin-ver-recibos-vuelos">
              {" "}
              <a className="nav-link">Ver recibos de vuelo</a>
            </NavLink>
          </li>
          <p></p>
          <li className="nav-item">
            <NavLink to="/admin-cargar-recibos-combustible">
              {" "}
              <a className="nav-link">Cargar recibo de combustible</a>
            </NavLink>
          </li>
        </ul>
      </>)
    }
  };



  // ------------------------------------------------------------------------------------------------------------------




  useEffect(() => {
    // Actualizar el estado con el rol almacenado en el local storage al cargar el componente
    buscarUsuario();
  }, []);

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand">
          {" "}
          <img
            src="https://drive.google.com/uc?export=view&id=19U8BFR2N0VfapOWtSvoiRSsXvOc6iVdH"
            alt=""
          />
          Aeroclub Lincoln
        </a>
          {navLogueo()}
        <div
          className="offcanvas offcanvas-end"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <Avatar
              className="avatar"
              alt="Remy Sharp"
              src={localStorage.getItem("avatar")}
            ></Avatar>
            <div className="nombre">
              <h4>{`${localStorage.getItem("nombre")}`}</h4>
            </div>            
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              {/*Aca agrego los botones de login y logout segun si esta loggeado o no */}
              <li className="login-google">
                {changeSesion ? <LogoutGoogle /> : <LoginGoogle />}
              </li>
              <li className="nav-item">
                <NavLink to="/">
                  {" "}
                  <a className="nav-link no-underline">Inicio</a>
                </NavLink>
              </li>
              <li className="nav-item">
                <a
                  onClick={() => {
                    switch (selectedRole) {
                      case "Gestor":
                        navigate("/panel-administrador", { replace: true });
                        break;
                      case "Asociado":
                        navigate("/panel-asociado", { replace: true });
                        break;
                        case "Instructor":
                          navigate("/", { replace: true });
                        break;
                        case "Mecanico":
                        navigate("/", { replace: true });
                        break;
                      default:
                        break;
                    }
                  }}
                >
                  {" "}
                  <a className="nav-link">Panel de control</a>
                </a>
              </li>
              {/* <li className="nav-item">
                <NavLink to="/">
                  {" "}
                  <a className="nav-link">Contactos</a>
                </NavLink>
              </li> */}
              <li className="nav-item dropdown">
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
                  {seleccionarRol()}
                </div>
              </li>
            </ul>
            {/* <Divider className="divider" variant="middle" />

            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <div className="dropdown">
                <a
                  className="btn btn-secondary dropdown-toggle mi-info"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Mi Informacion
                </a>

                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </div>
              <li className="nav-item turnos">
                <NavLink to="/">
                  {" "}
                  <a className="nav-link">Turnos</a>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/">
                  {" "}
                  <a className="nav-link">Ver certificado CMA</a>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/">
                  {" "}
                  <a className="nav-link">Ver licencias</a>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/">
                  {" "}
                  <a className="nav-link">Registro historicos de vuelos</a>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin-administrar-usuarios">
                  {" "}
                  <a className="nav-link">Administrar Usuario</a>
                </NavLink>
              </li>
            </ul>
            <Divider className="divider" variant="middle" />

            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <NavLink to="/">
                  {" "}
                  <a className="nav-link">Cargar Certificado CMA</a>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/">
                  {" "}
                  <a className="nav-link">Cargar Licencias</a>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/">
                  {" "}
                  <a className="nav-link">Editar mis datos</a>
                </NavLink>
              </li>
            </ul> */}

            {funcionGestorNav()}
          </div>
        </div>
      </div>
    </nav>
  );
}

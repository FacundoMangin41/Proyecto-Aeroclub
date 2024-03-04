import { GoogleLogout } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { usuarioEnSesion } from "../../atomos/atoms";

const clientId = import.meta.env.VITE_CLIENT_ID;
//const clientId ="757917448675-e4ek8n24frkil8f7s8infc1ufdsq8nmg.apps.googleusercontent.com";

function LogoutGoogle() {
  const navigate = useNavigate();
  const [userSesion, setUserSesion] = useRecoilState(usuarioEnSesion);

  const onSuccess = () => {
    console.log("Log out successfull!");
    //aca hay que borrar el token y resetear el state global
    setUserSesion({
      email: "",
      roles: [],
    });
    localStorage.setItem("token", "");
    localStorage.setItem("nombre", ""); //no funciona el atom
    localStorage.setItem("avatar", ""); //no funciona el atom
    localStorage.setItem("email", "");
    localStorage.setItem("rol", "");
    navigate("/", { replace: true });
  };

  return (
    <div id="signOutButton">
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}

export { LogoutGoogle };

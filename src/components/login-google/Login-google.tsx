import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { emailSignIn } from "../../atomos/atoms";

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { fetchAPIAuthToken } from "../../api/apiCalls";
import { useAuthToken } from "../../hooks/useAuthToken";
import Swal from "sweetalert2";
import "./login-google.css";
import { apiLogin } from "../../services/apiLogin";
import { apiRoles } from "../../services/apiRoles";
import { apiUsuarios } from "../../services/apiUsuarios";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const clientId = import.meta.env.VITE_CLIENT_ID;
//const clientId ="757917448675-e4ek8n24frkil8f7s8infc1ufdsq8nmg.apps.googleusercontent.com";

function LoginGoogle() {
  const { decodificarToken } = useAuthToken();
  const [emailGoogle, setEmailGoogle] = React.useState("");

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setEmailGoogle("");
    setOpen(false);
  };
  const navigate = useNavigate();

  //este recoil es un estado global para transmitir el email
  const [email, setEmail] = useRecoilState(emailSignIn);

  const onSuccess = async (res: any) => {
    // console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
    
    // console.log("email: ", res.profileObj.email);
    //aca tengo que guardar en un estado global el mail
    setEmail(res.profileObj.email);
    
    
    const response = await apiLogin.getByEmail(res.profileObj.email);
    // console.log(response.data);

        if (response.data.success){
          // Se revisa que el usuario haya sido registrado previamente y se le pregunta si desea rehabilitarlo
          const habilitado = await apiUsuarios.getHabilitado(res.profileObj.email as string, response.data.token);
          // console.log(habilitado);
          if (habilitado === 0) {
            Swal.fire({
              title: "Ya tenias un usuario registrado previamente, ¿Deseas rehabilitarlo?",
              showDenyButton: true,
              showCancelButton: false,
              confirmButtonText: "Si",
              denyButtonText: `No`
            }).then(async (result) => {
              if (result.isConfirmed) {
                await apiUsuarios.rehabilitar(res.profileObj.email, response.data.token);
              } else if (result.isDenied) {
                Swal.fire("No has rehabilitado tu usuario", "", "info");
              }
            });
            
          } else {
            // console.log("Logeado");
            // console.log(response);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("nombre", res.profileObj.name); //no funciona el atom
            localStorage.setItem("avatar", res.profileObj.imageUrl); //no funciona el atom
            localStorage.setItem("email", res.profileObj.email);
            

            navigate("/panel-asociado", { replace: true });
          }
        }
        else{
          const result = await fetchAPIAuthToken(email as any);
              if (result.success) {
                console.log("Se encontro usuario con ese mail.");
                localStorage.setItem("token", result.token);

                console.log("token: ", result.token);

                //cargo los datos del token que fui a buscar
                await decodificarToken();
                navigate("/", { replace: true });
              } else {
                setEmailGoogle(res.profileObj.email);
                // No se encontro un usuario cargado en la base de datos. Se pregunta si el usuario desea crearlo
                setOpen(true);
              }
        }


    

  };

  const onFailure = (res: any) => {
    console.log("LOGIN FAILED! res: ", res);
    navigate("/", { replace: true });
  };

  return (
    <>
    <div id="signInButton">
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={false}
      />
    </div>
    <React.Fragment>
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{`No se encontro usuario.`}</DialogTitle>
      <DialogContent className="container-dialog-login">
        <DialogContentText className="color-texto-email">¿Desear crear un usuario con este email? {`${email}`}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={ async () => {
          navigate('/cargar-usuario-nuevo', { state: { emailGoogle } });
          setEmailGoogle("");
          setOpen(false);
        }}>Continuar</Button>
      </DialogActions>
    </Dialog>
  </React.Fragment>
  </>
  );
}

export { LoginGoogle };

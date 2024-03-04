import { atom } from "recoil";

export const emailSignIn = atom({
  key: "emailSignIn",
  default: {
    email: "",
  },
});

export const usuarioEnSesion = atom({
  key: "usuarioEnSesion",
  default: {
    email: "",
    roles: [""],
  },
});

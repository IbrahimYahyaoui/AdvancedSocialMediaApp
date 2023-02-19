import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export const useLogout = () => {
  const { dispatch } = useContext(AuthContext);
  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT", payload: null });
    console.log("test");
  };
  return { logout };
};

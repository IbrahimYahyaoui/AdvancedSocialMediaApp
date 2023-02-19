import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export const useLogin = (username, password) => {
  const { dispatch } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (username, password) => {
    // console.log(username, password);

    setIsLoading(true);
    const response = await fetch("http://localhost:4000/dot/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const json = await response.json();
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
      toast.success("account create successfully");
      return navigate("/home");
    }
    if (!response.ok) {
      toast.error(json.error);
      setIsLoading(false);
    }
  };
  return { login, isLoading };
};

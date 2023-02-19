import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export const useSignup = (UserForm) => {
  const { dispatch } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const signup = async (UserForm) => {
    setIsLoading(true);

    const response = await fetch("http://localhost:4000/dot/signup", {
      method: "post",
      body: UserForm,
    });
    const json = await response.json();

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      toast.success("account create successfully");
      navigate("/home");
      setIsLoading(false);
    }
    if (!response.ok) {
      toast.error(json.error);
      setIsLoading(false);
    }
  };
  return { signup, isLoading };
};

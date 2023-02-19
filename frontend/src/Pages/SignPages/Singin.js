import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { useLogin } from "../../Hooks/useLogin";
import { SpinnerCircular } from "spinners-react";
import "./style.scss";
import { AuthContext } from "../../Context/AuthContext";
const Singin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useContext(AuthContext);
  const { login, isLoading } = useLogin();
  if (user) {
    return <Navigate to="/home" replace="true" />;
  }
  const handelLogin = async (e) => {
    e.preventDefault();
    await login(username, password);
  };
  return (
    <div className="wrapper">
      <div className="container">
        <div className="left">
          <p>
            Connect <br /> Share <br /> Have fun
          </p>
        </div>
        <div className="right">
          <h1 className="logo">Dot.</h1>
          <div className="right-Wrapper">
            <h3>Welcome back!</h3>
            <p className="sub">Please enter your signin detail below</p>
            <form>
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />

              <input
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <p
                className="psd"
                onClick={() => {
                  toast.dismiss();
                  toast("Just make new account!", {
                    icon: "🤷‍♂️",
                  });
                }}
              >
                forget password?
              </p>
              {!isLoading ? (
                <button
                  className="btn"
                  // disabled={true}
                  onClick={(e) => {
                    toast.dismiss();
                    e.preventDefault();
                    if (password.length > 6 && username.length > 4) {
                      handelLogin(e);
                      // console.log("Work");
                    } else {
                      if (password.length < 6) {
                        toast.error("password should be longer than 5");
                      }
                      if (username.length < 4) {
                        toast.error("username should be longer than 3");
                      }
                    }
                  }}
                >
                  signin
                </button>
              ) : (
                <button
                  className="btn"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <SpinnerCircular
                    size={35}
                    thickness={180}
                    speed={132}
                    color="rgba(255, 255, 255, 1)"
                    secondaryColor="rgba(0, 0, 0, 0.44)"
                  />
                </button>
              )}
              <p className="account-existe">
                already have an account <Link to="/signup">signup</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Singin;

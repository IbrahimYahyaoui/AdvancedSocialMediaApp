import React, { useContext, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { useSignup } from "../../Hooks/useSignup";
import { SpinnerCircular } from "spinners-react";

import "./style.scss";
const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const backgroundRef = useRef("");
  const { signup, isLoading } = useSignup();
  const { user } = useContext(AuthContext);
  if (user) {
    return <Navigate to="/home" replace="true" />;
  }
  const handelSubmit = async (e) => {
    const UserForm = new FormData();

    e.preventDefault();
    UserForm.append("username", username);
    UserForm.append("password", password);
    UserForm.append("profilePicture", profilePicture);
    // console.log(Array.from(UserForm));
    await signup(UserForm);
    // console.log("end");
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
            <h3>Join Dot World!</h3>
            <p className="sub">Please enter your signup detail below</p>
            <form>
              <div className="picture" ref={backgroundRef}>
                <label htmlFor="uploadpicture"></label>
                <input
                  id="uploadpicture"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setProfilePicture(e.target.files[0]);
                    const imageSrc = URL.createObjectURL(e.target.files[0]);
                    backgroundRef.current.style.backgroundImage = `url(${imageSrc})`;
                    // backgroundRef.current.style
                  }}
                />
              </div>
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

              {!isLoading ? (
                <button
                  className="btn"
                  onClick={(e) => {
                    toast.dismiss();

                    e.preventDefault();
                    if (
                      password.length > 6 &&
                      username.length > 4 &&
                      profilePicture !== ""
                    ) {
                      handelSubmit(e);
                    } else {
                      if (password.length < 6) {
                        toast.error("password should be longer than 5");
                      }
                      if (username.length < 4) {
                        toast.error("username should be longer than 3");
                      }
                      if (profilePicture === "") {
                        toast.error("upload a profile picture");
                      }
                    }
                  }}
                >
                  signup
                </button>
              ) : (
                <button
                  className="btn"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <SpinnerCircular
                    size={25}
                    thickness={180}
                    speed={132}
                    color="rgba(255, 255, 255, 1)"
                    secondaryColor="rgba(0, 0, 0, 0.44)"
                  />
                </button>
              )}
              <p className="account-existe">
                don't have an account <Link to="/">signin</Link>!
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

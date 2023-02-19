import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import Navbar from "./Navbar/Navbar";
import MainSection from "./sections/mainSection/MainSection";
import "./style.scss";
const Home = () => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/" replace="true" />;
  }
  return (
    <div className="Home-wrapper">
      <section className="navbar-container">
        <Navbar />
      </section>

      <div className="Home-sections">
        <section className="left-section"></section>
        <section className="main-section">
          <MainSection />
        </section>
        <section className="right-section">c</section>
      </div>
    </div>
  );
};

export default Home;

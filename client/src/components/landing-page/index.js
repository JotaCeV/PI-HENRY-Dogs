import React from "react";
import "./landing-page.css";
import Background from "../../assets/dogs-background.mp4";
import Logo from "../../assets/landing-title.png";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="landing-container">
      <video autoPlay loop muted>
        <source src={Background} type="video/mp4" />
      </video>
      <div className="landing-title">
        <h1>Bienvenidos a</h1>
        <img src={Logo} alt="logo" />
        <h2>Un lugar para encontrar a tu mejor amigo!</h2>
        <div className="home-button">
          <Link to="/Home" className="landing-button">
            Buscar!
          </Link>
        </div>
      </div>
    </div>
  );
}

export { LandingPage };

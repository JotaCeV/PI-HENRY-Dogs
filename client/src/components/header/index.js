import React from "react";
import "./header.css";
import { NavLink, Link } from "react-router-dom";
import Logo from "../../assets/doggypedia-logo.png";

function Header() {
  return (
    <div className="header-container">
      <React.Fragment>
        <nav className="nav-container">
          <Link exact to="/">
            <img src={Logo} alt="Logo" />
          </Link>

          <ul className="nav-list">
            <li>
              <NavLink to="/Home" className="link-text">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/About" className="link-text">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/Create-dog" className="link-text">
                Create Dog
              </NavLink>
            </li>
          </ul>
        </nav>
      </React.Fragment>
    </div>
  );
}

export { Header };

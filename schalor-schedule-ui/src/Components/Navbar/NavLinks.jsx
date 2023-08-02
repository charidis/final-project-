import * as React from "react";
import "./NavLinks.css";

import { Link } from "react-router-dom";

export default function NavLinks({ isLoggedIn, handleOnLogout }) {
  return (
    <div className="nav-elements">
      <ul className="logo">
        <li>
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="logo">
              <img className="img-logo" src="/images/logo.png" alt="logo" />
              <div className="vr" />
              <h3 className="logo-title">SchalorSchedule</h3>
            </div>
          </Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <button className="btn-login">{isLoggedIn ? null : "Login"}</button>
          </Link>
        </li>
        <li>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <button
              className="btn-sign-up"
              onClick={isLoggedIn ? { handleOnLogout } : null}
            >
              {isLoggedIn ? "Logout" : "Sign up"}
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
}

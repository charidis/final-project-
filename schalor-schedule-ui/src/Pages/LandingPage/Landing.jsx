import * as React from "react";
import "./Landing.css";

import Navbar from "../../Components/Navbar/Navbar";

export default function Landing() {
  return (
    <div className="landing-page">
      <Navbar />
      <div className="hero">
        <h1>An Assignment Tracker</h1>
        <p>that helps you take control of your semester</p>
      </div>
    </div>
  );
}

import * as React from "react";
import "./HomePage.css";
import { useState, useEffect } from "react";
import apiClient from "../../services/apiClient";

import SideNav from "../../components/SideNav/SideNav";
import HomeDetails from "../../Components/HomeDetails/HomeDetails";

export default function HomePage({ user, terms }) {
  const [isFetching, setIsFetching] = useState(false)

  return (

    <div className="home-page">
      <SideNav user={user} terms={terms}/>
      <HomeDetails terms={terms}/>
    </div>
  );
}

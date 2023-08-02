import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";

import Landing from "../LandingPage/Landing";
import Login from "../../Components/Login/Login";
import Registration from "../../Components/Registration/Registration";
import TermDetailPage from "../TermDetailPage/TermDetailPage";

import apiClient from "../../services/apiClient";
import HomePage from "../HomePage/HomePage";
import ClassDetailPage from "../ClassDetailPage/ClassDetailPage";

export default function App() {
  const [user, setUser] = useState({});
  const [terms, setTerms] = useState([])
  const [assignments, setAssignments] = useState([])
  const [isFetching, setIsFetching] = useState(false)




  useEffect(() => {
    const fetchTerms = async () => {
      setIsFetching(true);

      const { data, error } = await apiClient.fetchTerms();
      if (data) setTerms(data.terms);
    
      setIsFetching(false);
    };
    fetchTerms();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      setIsFetching(true);

      const { data, error } = await apiClient.fetchUserFromToken();
      if (data) setUser(data.user);
    
      setIsFetching(false);
    };
    const token = localStorage.getItem("schalor_schedule_token");
    if (token){
      apiClient.setToken(token);
      fetchUser();
    }
  
  }, []);


  // const handleOnLogout = async () => {
  //   await apiClient.logoutUser();
  //   setUser({});
  //   setNutritions([]);
  //   setIsLoggedIn(false);
  //   setError(null);
  // };

  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login user={user} setUser={setUser} />} />
            <Route
              path="/register"
              element={<Registration user={user} setUser={setUser} />}
            />
            <Route path="/home" element={<HomePage user={user} terms={terms}/>} />
            <Route path="/classDetails/" element={<ClassDetailPage />} />
            <Route path="/termDetails/:index" element={<TermDetailPage user={user} terms={terms} assignments={assignments} setAssignments={setAssignments}/>} />
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    </div>
  );
}

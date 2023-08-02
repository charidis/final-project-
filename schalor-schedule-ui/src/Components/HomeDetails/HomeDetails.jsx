import * as React from "react";
import { useState, useRef } from "react";
import "./HomeDetails.css";

import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import apiClient from "../../services/apiClient";


export default function HomeDetails({ user, terms }) {

  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    title: "",
  });
  console.log(terms)
  useEffect(() => {
    if (user?.email) {
      navigate("/home");
    }
  }, [user, terms]);
console.log(terms)
  const handleOnSubmit = async () => {
    setIsProcessing(true);
    setErrors((e) => ({ ...e, form: null }));

    const { data, error } = await apiClient.createNewTerm({
      title: "new term",
    });
    location.reload();
    setIsProcessing(false);
  };
  
  return ( 
    <div className="home-detail-dash">
      {terms.map((term, index) => (
        <div key={index} className="class-card">
          <Link to={`/termDetails/${term.id}`} style={{ textDecoration: "none" }}>  <img
            src="https://picsum.photos/600/400"
            alt="Sample photo"
          /> </Link>
          <div class="text">
          <input
            className="term-title"
            type="text"
            name="title"
            placeholder={term.title}
          />
          <Link to={`/termDetails/${term.id}`} style={{ textDecoration: "none" }}> <p>89 Assignments</p></Link> 
          </div>
        </div>
    

    ))}
      
      <button className="new-class-card" onClick={handleOnSubmit}><svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-plus-lg"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
              />
            </svg></button>
      
    </div>
  );
}

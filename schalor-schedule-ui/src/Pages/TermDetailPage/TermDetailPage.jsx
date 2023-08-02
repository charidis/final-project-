import * as React from "react";
import "./TermDetailPage.css";

import SideNav from "../../components/SideNav/SideNav";
import TermDetails from "../../Components/TermDetails/TermDetails";
import apiClient from "../../services/apiClient";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function TermDetailPage({ user, terms, assignments, setAssignments}) {
  const [isFetching, setIsFetching] = useState(false)
  let params = useParams();
  const termIndex = params.index
 
  
  useEffect(() => {
    const fetchAssignments = async () => {
      setIsFetching(true);

      const { data, error } = await apiClient.fetchAssignments(termIndex);
      if (data) setAssignments(data.assignments);
    
      setIsFetching(false);
    };
    fetchAssignments();
  }, []);
  console.log(terms)
  return (
    <div className="term-detail-page">
      <SideNav user={user} terms={terms} />
      <TermDetails assignments={assignments} terms={terms} termIndex={termIndex}/>
    </div>
  );
}

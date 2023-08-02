import * as React from "react";
import "./ClassDetailPage.css";

import SideNav from "../../components/SideNav/SideNav";
import ClassDetails from "../../Components/ClassDetails/ClassDetails";

export default function ClassDetailPage() {
  return (
    <div className="class-detial-page">
      <SideNav />
      <ClassDetails />
    </div>
  );
}

import * as React from "react";
import "./ClassDetails.css";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';


export default function ClassDetails() {
  return (
    <div className="class-detial-dash">
      <Row>
        <Col>
          <span className="class-detial-logo-title">Assignment Dashboard</span>
        </Col>
        <Col className="page-menu">
          <svg
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
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-three-dots"
            viewBox="0 0 16 16"
          >
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
          </svg>
        </Col>
      </Row>
      <Row>
        <Breadcrumb>
          <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/termDetails">Summer 2023</Breadcrumb.Item>
          <Breadcrumb.Item href="/classDetails">MATH1302</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <h1>MATH1302</h1>
      <Table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Course</th>
            <th>Name</th>
            <th>Date</th>
            <th>Task</th>
          </tr>
        </thead>
        <tbody>
         
          <tr>
            <td>
            <Form.Check // prettier-ignore
            type={checkbox}
            id={`default-checkbox`}
           
          />
            </td>
            <td>MATH1302</td>
            <td>Assignment 2 - Integrals</td>
            <td>October 1, 2023</td>
            <td>Assignment</td>
          </tr>
        </tbody>
      </Table>
      <Button variant="outline-secondary">Secondary</Button>
    </div>
  );
}

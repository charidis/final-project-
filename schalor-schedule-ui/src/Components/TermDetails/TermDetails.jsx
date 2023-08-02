import * as React from "react";
import "./TermDetails.css";
import { useParams } from "react-router-dom";


import apiClient from "../../services/apiClient";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";

export default function TermDetails({ assignments, terms, termIndex }) {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const [form, setForm] = useState({
    courseName: "",
    assignmentName: "",
  });
  const handleOnInputChange = (event) => {
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  }
  const handleOnSubmit = async () => {
      setIsProcessing(true);
      setErrors((e) => ({ ...e, form: null }));
  
      const { data, error } = await apiClient.createNewTerm({
        course: form.courseName,
        assignment: form.assignmentName,
      });
      location.reload();
      setIsProcessing(false);
    };
  
  return (
    <div className="term-detial-dash">
      <div className="home-dash">
        <Row>
          <Col>
            <span className="home-dash-title">Assignment Dashboard</span>
          </Col>
          <Col className="page-menu">
            <Button ref={target} onClick={() => setShow(!show)}>
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
            </Button>
            <Overlay className="overlay" target={target.current} show={show} placement="bottom">
              {(props) => (
                <Tooltip id="overlay-example" {...props}>
                <Form.Control
                name="course"
                type="text"
                placeholder="Course Name"
                value={form.courseName}
                onChange={handleOnInputChange}
                />
              <Form.Control
                name="name"
                type="text"
                placeholder="Assignment Name"
                value={form.assignmentName}
                onChange={handleOnInputChange}
              />
                </Tooltip>
              )}
            </Overlay>
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
            <Breadcrumb.Item href="/termDetails">
            {terms[termIndex].title?`${terms[termIndex].title}`:null}
            </Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <h1>{terms[termIndex].title?`${terms[termIndex].title}`:null}</h1>
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
            {assignments.map((assignment) => (
              <tr>
                <td>
                  <Form.Check type="checkbox" id="default-checkbox" />
                </td>
                <td>{assignment.course}</td>
                <td>{assignment.name}</td>
                <td>Novmber 30,2023</td>
                <td>Exam</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

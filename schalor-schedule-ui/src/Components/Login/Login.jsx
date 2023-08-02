import Navbar from "../Navbar/Navbar";
import * as React from "react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";
import "./Login.css";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login({ setIsLoggedIn, setUser, user, setIsLoading }) {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user?.email) {
      navigate("/home");
    }
  }, [user]);

  const handleOnInputChange = (event) => {
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async () => {
    setIsProcessing(true);
    setErrors((e) => ({ ...e, form: null }));

    const { data, error } = await apiClient.loginUser({
      email: form.email,
      password: form.password,
    });

    if (error) {
      setErrors((e) => ({ ...e, form: error }));
    }

    if (data?.user) {
      setUser(data.user);
      apiClient.setToken(data.token);
    }

    setIsProcessing(false);
  };

  return (
    <div className="login-page">
      <Navbar />
      <div className="login-form">
        <Form>
          <Row>
            <Col>
              <Form.Control
                className="mb-3"
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleOnInputChange}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleOnInputChange}
              />
            </Col>
          </Row>
        </Form>
        <button className="login-page-btn" disabled={isProcessing} onClick={handleOnSubmit}>Login</button>
        <p>Dont't have an account? Sign up</p>
      </div>
    </div>
  );
}

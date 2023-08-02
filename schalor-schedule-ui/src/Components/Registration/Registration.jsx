import * as React from "react";
import "./Registration.css";

import apiClient from "../../services/apiClient";
import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"

import Navbar from "../Navbar/Navbar";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function Registration({ setUser, user }) {
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  })


  useEffect(() => {
    if (user?.email) {
      navigate("/home")
    }
  }, [user])


  const handleOnInputChange = (event) => {
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }))
      } else {
        setErrors((e) => ({ ...e, email: null }))
      }
    }
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
  }


  const handleOnSubmit = async () => {
    setIsProcessing(true)
    setErrors((e) => ({ ...e, form: null }))

    const{ data, error } = await apiClient.registerUser( {
      email: form.email,
      firstName: form.firstName,
      lastName: form.lastName,
      password: form.password,
    } )

    if (error) {
    setErrors((e) => ({...e, form: error }))
    }

    if (data?.user){
      setUser(data.user)
      apiClient.setToken(data.token)
    }
   
    setIsProcessing(false)
  }

  return (
    <div className="registration-page">
      <Navbar />
      <div className="registration-form">
        <Form>
          <Row>
            <Col>
              <Form.Control className="mb-3"
                  name="email" 
                  type="email" 
                  placeholder="Email"
                  value={form.email}
                  onChange={handleOnInputChange} />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Control 
                  name="firstName" 
                  type="text" 
                  placeholder="First name" 
                  value={form.firstName}
                  onChange={handleOnInputChange} />
            </Col>
            <Col>
              <Form.Control
                  name="lastName" 
                  type="text"
                  placeholder="Last name"
                  value={form.lastName}
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
                  onChange={handleOnInputChange} />
            </Col>
          </Row>
        </Form>
        <button className="registration-page-btn" disabled={isProcessing} onClick={handleOnSubmit}>
          {isProcessing ? "Loading..." : "Create Account"}</button>
        <p>Have an account? Login</p>
      </div>
    </div>
  );
}

import {React, useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Header from "../component/header/Header";

import { useNavigate, useLocation } from "react-router-dom";

import apiAuth from "../api/apiAuth";

export default function SingIn() {
  let navigate = useNavigate();

  const onClick = () => {
    navigate("/main", { bjir: { id: 1 } });
  };

  const [dto, setDto] = useState({
    email: "",
    password: "",
  });

  const handleChangeEmail = (event) => {
    setDto({
      ...dto,
      ["email"]: event.target.value,
    });
  };

  const handleChangePassword = (event) => {
    setDto({
      ...dto,
      ["password"]: event.target.value,
    });
  };

  

  const onSubmit = (event) => {
      event.preventDefault();

      apiAuth.signin(dto)
      .then((data) => {
        if(data["status"] === 200){
          navigate("/main", { state: { userId: data["userId"]} })
        } else{
          alert('Username or Password Incorrect!!!')
        }
      }).catch((error) => console.log(error))
      
      
    };

  return (
    <>
      <Header />
      <div
        className="container rounded-3"
        style={{
          width: "60%",
          backgroundColor: "#e5f1f6",
          marginTop: "30px",
          padding: "20px 40px 40px 40px",
        }}
      >
        <p className="" style={{ color: "black", fontSize: "2em" }}>
          Sign In
        </p>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={handleChangeEmail}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={handleChangePassword}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

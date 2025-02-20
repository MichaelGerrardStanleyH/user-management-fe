import { React, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useLocation, useNavigate } from "react-router-dom";

import Header from "../component/header/Header";
import apiMember from "../api/apiMember";
import apiAuth from "../api/apiAuth";

export default function SingUp() {
  let navigate = useNavigate();

  const [member, setmember] = useState([]);

  useEffect(() => {
    apiMember.list().then((data) => {
      setmember(data);
    });
  }, []);

  const [dto, setDto] = useState({
    name: "",
    email: "",
    password: "",
    position: "",
    organizationId: 1,
    reportsToId: 0,
  });

  const handleChangeName = (event) => {
    setDto({
      ...dto,
      ["name"]: event.target.value,
    });

    console.log(dto);
  };

  const handleChangeEmail = (event) => {
    setDto({
      ...dto,
      ["email"]: event.target.value,
    });

    console.log(dto);
  };

  const handleChangePassword = (event) => {
    setDto({
      ...dto,
      ["password"]: event.target.value,
    });
  };

  const handleChangePosition = (event) => {
    setDto({
      ...dto,
      ["position"]: event.target.value,
    });
  };

  const handleChangeReportsTo = (event) => {
    setDto({
      ...dto,
      ["reportsToId"]: parseInt(event.target.value),
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const payload = {
      dto: dto,
    };


    apiAuth
      .signUp(payload)
      .then((data) => {
        console.log("data has been saved");
        if(data == "Success Create User"){
          navigate("/signin");
        }
      })
      .catch((error) => console.log(error));

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
          marginBottom: "30px",
          padding: "20px 40px 40px 40px",
        }}
      >
        <p className="" style={{ color: "black", fontSize: "2em" }}>
          Sign Up
        </p>
        <Form onSubmit={onSubmit}>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={handleChangeEmail}
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              onChange={handleChangePassword}
            />
          </Form.Group>



          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              onChange={handleChangeName}
            />
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="formBasicPosition"
            onChange={handleChangePosition}
          >
            <Form.Label>Position</Form.Label>
            <Form.Control type="text" placeholder="Enter positon" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicReportsTo">
            <Form.Label>Reports To</Form.Label>
            <Form.Select
              aria-label="Default select example"
              style={{ marginBottom: "20px" }}
              onChange={handleChangeReportsTo}
            >
              <option>Select Reports To</option>
              {(member || []).map((obj) => {
                return <option value={obj["id"]}>{obj["name"]}</option>;
              })}
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

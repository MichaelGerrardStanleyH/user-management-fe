import { React, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useLocation, useNavigate } from "react-router-dom";

import apiMember from "../api/apiMember";
import { data } from "react-router-dom";
import HeaderMain from "../component/headermain/HeaderMain";

export default function CreateMember() {
  const [member, setmember] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    apiMember.list().then((data) => {
      setmember(data);
    });
  }, []);


  const [dto, setDto] = useState({
    name: "",
    position: "",
    organizationId: 1,
    reportsToId: 0,
  });

  const handleChangeName = (event) => {
    setDto({
      ...dto,
      ["name"]: event.target.value,
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
      dto: dto
    };

    apiMember
      .createWithImage(payload)
      .then((data) => {
        console.log("data has been saved");
      })
      .catch((error) => console.log(error));

    navigate("/member");
  };

  const onClickBanner = () => {
    navigate(-1);
  };

  return (
    <>
      <HeaderMain onClick={onClickBanner} />
      <div className="container">
        <h1 style={{marginTop: "15px"}}>Create Member Page</h1>

        <div className="container">
          <Form onSubmit={onSubmit}>
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
                {member.map((obj) => {
                  return <option value={obj["id"]}>{obj["name"]}</option>;
                })}
              </Form.Select>
            </Form.Group>


            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}

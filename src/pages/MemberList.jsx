import { React, useEffect, useState } from "react";
import apiMember from "../api/apiMember";
import { data } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { Navigate, useNavigate } from "react-router-dom";
import HeaderMain from "../component/headermain/HeaderMain";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function MemberList() {
  let navigate = useNavigate();

  const [member, setmember] = useState([]);

  const [name, setName] = useState();

  useEffect(() => {
    apiMember.list().then((data) => {
      setmember(data);
    });
  }, []);


  const onClickDetail = (id) => () => {
    navigate("details", { state: { memberId: id } });
  };

  const onClickBanner = () => {
    navigate(-1);
  };


  const handleChangeSearch = (event) => {
    setName(event.target.value);

  };

  const onSubmit = (event) => {
      event.preventDefault();

      if(name == "" || name == null){
        apiMember.list().then((data) => {
          setmember(data);
        });

      }else{
        
        apiMember
        .getByNameContains(name)
        .then((data) => {
          setmember(data);
        })
        .catch((error) => console.log(error));
      }

      
    };

  return (
    <>
      <HeaderMain onClick={onClickBanner} />

      <div className="container">
        <h1 style={{marginTop: "15px"}}>Member List Page</h1>

        <Row style={{marginTop: "30px"}}>
          <Col>
            <InputGroup className="mb-3" onChange={handleChangeSearch}>
              <Form.Control
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <Button variant="outline-secondary" id="button-addon2" onClick={onSubmit}>
                Button
              </Button>
            </InputGroup>
          </Col>
          <Col></Col>
          <Col></Col>
        </Row>

        <Table striped>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>position</th>
              <th>reportsTo</th>
            </tr>
          </thead>
          <tbody>
            {member.map((obj) => {
              return (
                <tr>
                  <td>
                    <text>{obj["id"]}</text>
                  </td>
                  <td>
                    <text>{obj["name"]}</text>
                  </td>
                  <td>
                    <text>{obj["position"]}</text>
                  </td>
                  <td>
                    {obj["reportsTo"] ? (
                      <text>{obj["name"]}</text>
                    ) : (
                      <text>-</text>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
}

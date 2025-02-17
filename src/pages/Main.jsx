import { React, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Navigate, useNavigate, useLocation } from "react-router-dom";

import apiMember from "../api/apiMember";
import HeaderMain from "../component/headermain/HeaderMain";

export default function Main(props) {
  let navigate = useNavigate();

  const [user, setUser] = useState({});

  let { state } = useLocation();

  const onClickList = () => {
    // navigate("/main", { bjir: { id: 1 } });
    navigate("/member", { bjir: { id: 1 } });
  };

  const onClickCreate = () => {
    navigate("/create", { bjir: { id: 1 } });
  };

  useEffect(() => {
    apiMember.getById(state.userId).then((data) => {
      setUser(data);
    });
  }, []);

  const onClickBanner = () =>{
    navigate("/main");
  }

  return (
    <>
      <HeaderMain onClick={onClickBanner}/>

      <div className="container">
        <div style={{}}>
          <h1 style={{marginTop: "15px"}}>{`Welcome ${user["name"]}, select the page you want`}</h1>
        </div>

        <ul
          className="listButton"
          style={{ listStyle: "none", margin: "0", padding: "0", marginTop: "25px"}}
        >
          <li>
            <Button
              variant="primary"
              style={{ marginBottom: "10px" }}
              onClick={onClickList}
            >
              See all member
            </Button>
          </li>
          <li>
            <Button variant="primary" onClick={onClickCreate}>
              Create Member
            </Button>
          </li>
        </ul>
      </div>
    </>
  );
}

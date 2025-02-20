import { React, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiMember from "../api/apiMember";
import Image from "react-bootstrap/Image";
import HeaderMain from "../component/headermain/HeaderMain";

export default function MemberDetails(props) {
  let navigate = useNavigate();

  let { state } = useLocation();


  const [member, setMember] = useState({});


  useEffect(() => {
    apiMember.getById(state.memberId).then((data) => {
      //   setMember(data);
      setMember({
        ...data,
        ["imageData"]: "data:image/jpeg;base64," + data["imageData"],
      });
    });
  }, []);

  return (
    <>
      <HeaderMain/>
      <div className="container">
        <h1 style={{marginTop: "15px"}}>Member Detail</h1>
        <div className="container">
          <p>Name: {member["name"]}</p>
          <p>Postion: {member["position"]}</p>
          <p>
            Reports To:{" "}
            {member["reportsTo"] ? member["reportsTo"]["name"] : "-"}
          </p>

          <p>Picture: </p>
          <img src={member["imageData"]} width={"192px"} height={"108px"} />
        </div>
      </div>
    </>
  );
}

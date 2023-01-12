import React from "react";
import {Link} from "react-router-dom";
import BasicLayout from "../components/layouts/BasicLayout";

function Scalaton() {
  let subItem = (
    <div
      className="position-absolute text-center  position-fill text-body"
      style={{marginTop: "3rem"}}>
      <h1
        style={{
          fontFamily: "Inter",
          fontSize:31
        }}>
        <strong
        
        >Welcome to</strong>
      </h1>
      <h1
        style={{
          fontFamily: "Inter",
          fontSize:31
        }}>
        <strong>Saiyonee</strong>
      </h1>
    </div>
  );
  return (
    <BasicLayout >
        <div>

        </div>
    </BasicLayout>
  );
}

export default Scalaton;

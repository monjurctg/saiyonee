import React from "react";
import { Link } from "react-router-dom";
import BasicLayout from "../components/layouts/BasicLayout";

function Wellcome() {
  let subItem = (
    <div className="position-absolute text-center position-fill text-body" style={{marginTop:"8rem"}}>
      <h1
        style={{
          fontFamily: "Inter",
        }}
      >
        <strong>Welcome to</strong>
      </h1>
      <h1
        style={{
          fontFamily: "Inter",
        }}
      >
        <strong>Saiyonee</strong>
      </h1>
    </div>
  );
  return (
    <BasicLayout subItem={subItem}>
      <div className="flex-grow-1" style={{height:"30vh"}}>
        <img
          src="img/logo-index.png"
          alt="logo-index"
          className="img-fluid my-4"
          style={{objectFit:"contain",width:270}}
        />
      </div>

      <div className="container p-4" style={{height:"20vh"}}>
        <div className="row">
          <div className="col">
            <div className="d-flex align-items-center">
              <Link
                to={"/tutorial"}
                className="image-saturate position-relative ms-auto"
              >
                <img
                  src="img/next-btn-25-percent.svg"
                  alt="next-btn-25-percent.svg"
                  className="img-fluid"
                />
                <div className="position-absolute position-fill d-flex align-items-center justify-content-center">
                  <img
                    src="img/back-icon.svg"
                    alt="next-btn-25-percent.svg"
                    className="img-fluid rotate-180"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
}

export default Wellcome;

import React from "react";
import {Link} from "react-router-dom";

function Home() {
  return (
    <div>
      <div className="text-center min-vh-100 d-flex flex-column max-width-mobile mx-auto rounded-top">
        <div className="position-relative">
          <img
            src="img/bg-star.svg"
            alt="bg-star"
            className="img-fluid w-100 rounded-top"
          />
          <div className="position-absolute d-flex flex-column justify-content-center align-items-center position-fill text-body">
            <h1>
              <strong>Welcome to</strong>
            </h1>
            <h1>
              <strong>Saiyonee</strong>
            </h1>
          </div>
        </div>
        <div className="flex-grow-1">
          <img
            src="img/logo-index.png"
            alt="logo-index"
            className="img-fluid my-4"
          />
        </div>

        <div className="container p-4">
          <div className="row">
            <div className="col">
              <div className="d-flex align-items-center">
                <Link
                  to={"/tutorial"}
                  className="image-saturate position-relative ms-auto">
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
      </div>
    </div>
  );
}

export default Home;

import React from "react";
import {Link} from "react-router-dom";
import ReactPlayer from "react-player";

function Tutorial() {
  return (
    <>
      <div className="text-center min-vh-100 d-flex flex-column max-width-mobile mx-auto">
        {/* TODO: remove */}
        {/* <Redirect to={ROUTES.get_started} />
         */}
        <p>redirect</p>
        <div className="position-relative">
          <img
            src="img/bg.svg"
            alt="bg-star"
            className="img-fluid w-100 rounded-top"
          />
          <div className="position-absolute d-flex flex-column justify-content-center align-items-center position-top mt-6">
            {/* <LinkLogo /> */}
          </div>
        </div>
        <div className="container flex-grow-1 px-4">
          <div className="row">
            <div className="col">
              <div className="card border-0 mt-n15 bg-transparent rounded shadow">
                <div className="position-relative">
                  <img
                    src="img/tutorial-video-bg.jpg"
                    className="card-img-top rounded-top"
                    alt="tutorial-video-bg"
                  />

                  <div className="position-absolute position-fill bg-dark-transparent rounded-top d-flex justify-content-center align-items-center">
                    {/* <img
                      src="img/play.svg"
                      alt="play"
                      className="img-fluid position-fill"
                    /> */}
                    <ReactPlayer
                      // playIcon={<button >Play</button>}
                      url="/video/Post03.mp4"
                      width={"100%"}
                      height={"100%"}
                      controls={true}
                      style={{objectFit: "cover"}}
                    />
                  </div>
                </div>
                <div className="card-body bg-white rounded-bottom py-4">
                  <h1 className="card-title">How to create a profile</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container p-4">
          <div className="row">
            <div className="col">
              <div className="d-flex align-items-center justify-content-between">
                <Link to={"/"} className="image-saturate position-relative">
                  <img
                    src="img/next-btn-25-percent.svg"
                    alt="next-btn-25-percent.svg"
                    className="img-fluid"
                  />
                  <div className="position-absolute position-fill d-flex align-items-center justify-content-center">
                    <img
                      src="img/back-icon.svg"
                      alt="next-btn-25-percent.svg"
                      className="img-fluid"
                    />
                  </div>
                </Link>

                <Link
                  to={"/get-start"}
                  className="image-saturate position-relative">
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
    </>
  );
}

export default Tutorial;

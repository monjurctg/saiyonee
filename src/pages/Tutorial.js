import React from "react";
import {Link, useNavigate} from "react-router-dom";
import ReactPlayer from "react-player/lazy";
import BasicLayout from "../components/layouts/BasicLayout";
function Tutorial() {
  const navigator = useNavigate();

  let subItem = (
    <div className="position-absolute container position-top mt-2">
      <div className="row justify-content-center">
        <div className="col-2 pr-3">
          <button
            onClick={() => navigator(-1)}
            className="btn btn-light rounded-circle shadow p-3 image-invert"
            style={{height: "58px", width: "58px"}}>
            <img src="/img/back-icon.svg" alt="back" />
          </button>
        </div>
        <div className="col-8 d-flex justify-content-end">
          {/* <LinkLogo /> */}
          <div className="w-100">
            <img src="/img/logo.svg" alt="" />
          </div>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
  return (
    <>
      <BasicLayout subItem={subItem}>
        <div
          className="container flex-grow-1 px-4"
          style={{marginTop: "-6rem"}}>
          <div className="row">
            <div className="col">
              <div className="card border-0 bg-transparent rounded shadow">
                <div className="position-relative">
                  <ReactPlayer
                    url="/video/Post03.mp4"
                    width={"100%"}
                    height={"210px"}
                    style={{objectFit: "cover"}}
                    controls={true}
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
                    {/* <ReactPlayer
                      // playIcon={<button >Play</button>}
                      url="/video/Post03.mp4"
                      width={"100%"}
                      height={"100%"}
                      controls={true}
                      style={{objectFit: "cover"}}
                    /> */}
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
      </BasicLayout>
    </>
  );
}

export default Tutorial;

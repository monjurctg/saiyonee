import React, {useEffect, useState} from "react";

import "./../../assets/css/viewProfile.scss";
import "./../../assets/css/modal.scss";
import {useParams} from "react-router-dom";
import ExploreServices from "../../services/exploreServices";
import ExploreLayout from "../../components/layouts/ExploreLayout";
import dislike from "../../assets/imgs/dislike.svg";
import task from "../../assets/imgs/task.svg";
import rocket from "../../assets/imgs/rocket.svg";
import like from "../../assets/imgs/like.svg";
import blur from "../../assets/imgs/blur.png";
import cross from "../../assets/imgs/cross.png";
import {useDispatch, useSelector} from "react-redux";
import {setMatchModal} from "../../redux/slices/utilsSlice";

const MatchedUser = () => {
  let subtitle;

  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [singleData, setSingleData] = useState({});
  let dispatch = useDispatch();
  const {matchModal} = useSelector((state) => state.utils);
  let modalChange = () => {
    console.log("matchModal", matchModal);

    if (matchModal === true) dispatch(setMatchModal(false));
    else dispatch(setMatchModal(true));
  };

  const {id, appId, route} = useParams();
  // console.log(id, appId, route, "dfdk");
  async function fetchShortUser() {
    setLoading(true);

    let response = await ExploreServices.getSingleShortList(appId);
    console.log(response, "response");
    if (response === 200) {
      setLoading(false);
      setSingleData(response.data);
    }
  }
  async function fetchMatchUser() {
    setLoading(true);

    let response = await ExploreServices.getSingleMatchList(appId);
    console.log(response, "response");
    if (response === 200) {
      setLoading(false);
      setSingleData(response.data);
    }
  }
  async function fetchLikedUser() {
    setLoading(true);

    let response = await ExploreServices.getSingleLiked(appId);
    console.log(response, "response");
    if (response === 200) {
      setLoading(false);
      setSingleData(response.data);
    }
  }

  console.log(singleData, "singleData");

  useEffect(() => {
    if (route === "shortList") {
      fetchShortUser();
    } else if (route === "match") {
      fetchMatchUser();
    } else if (route == "like") {
      fetchLikedUser();
    }
  }, [id, module]);
  let tab = (
    <div className="container pt-2 ">
      <div className="items d-flex justify-content-evenly">
        <div
          className="itemss"
          // onClick={() => getActiveSlide(dislike)}
        >
          <img src={dislike} alt="" />
        </div>
        {route === "liked" && (
          <div
            className="itemss"
            //  onClick={() => getActiveSlide(addShort_list)}
          >
            <img src={task} alt="" />
          </div>
        )}
        <div
          className="itemss"
          // onClick={() => getActiveSlide(supper_like_submit)}
        >
          <img src={rocket} alt="" />
        </div>{" "}
        <div
          className="itemss"
          //  onClick={() => getActiveSlide(like)}
        >
          <img src={like} alt="" />
        </div>
      </div>
    </div>
  );
  let footer = (
    <div className="text-center">
      <button className="report">Report User</button>
    </div>
  );
  return (
    <>
      <ExploreLayout tab={tab} footer={footer}>
        <div className="explore_viewProfile text-center">
          <div className="content-container">
            <img className="user-img" src="/img/user.jpg" />
            <h2>Sharmila</h2>

            <p
              style={{
                textAlign: "Center",
              }}>
              <span className="short-description">Student</span>
              <span className="short-description">Khulna, BD</span>
              <span className="short-description">Age 24</span>
            </p>

            <h4
              style={{
                paddingLeft: 20,
              }}>
              Professional Details
            </h4>

            <p
              style={{
                color: "#000",

                fontSize: "14px",
              }}>
              Company Name
              <br />
              Position : Manager
              <br />
              Address : Lalmatia
              <br />
              LinkedIn Account Verified
            </p>

            <h4
              style={{
                paddingLeft: 20,
              }}>
              Educational qualification
            </h4>

            <p
              style={{
                color: "#000",

                fontSize: "14px",
              }}>
              University :
              <br />
              College :
              <br />
              School :
            </p>

            <h4>Personal Details</h4>

            <p
              style={{
                color: "#000",

                fontSize: "14px",
              }}>
              Name
              <br />
              Age
              <br />
              Gender
              <br />
              Height
              <br />
              Weight
              <br />
              Marital Status
              <br />
              Marital Timing
              <br />
              Date of Birth
              <br />
              Blood group
              <br />
              Nationality
              <br />
              Mother Tongue
              <br />
              Physical Status
            </p>
          </div>

          {route == "match" && (
            <>
              <img className="user-img" src="/img/user2.jpeg" />

              <div
                style={{
                  width: "53px",
                  background: "#D32C2C",
                  margin: "0 auto",
                  marginTop: "20px",
                  height: 10,
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginLeft: "-30px",
                  alignItems: "center",
                }}>
                <img
                  style={{
                    height: "55px",
                    width: "56px",
                    marginTop: "10px",
                    marginLeft: "10px",
                    borderRadius: "20px",
                  }}
                  className="user-img"
                  src="/img/user2.jpeg"
                />
                <img
                  style={{
                    height: "55px",
                    width: "56px",
                    marginTop: "10px",
                    marginLeft: "10px",
                    borderRadius: "20px",
                  }}
                  className="user-img"
                  src="/img/user2.jpeg"
                />
                <img
                  style={{
                    height: "55px",
                    width: "56px",
                    marginTop: "10px",
                    marginLeft: "10px",
                    borderRadius: "20px",
                  }}
                  className="user-img"
                  src="/img/user2.jpeg"
                />
                <img
                  style={{
                    height: "55px",
                    width: "56px",
                    marginTop: "10px",
                    marginLeft: "10px",
                    borderRadius: "20px",
                  }}
                  className="user-img"
                  src="/img/user2.jpeg"
                />
              </div>

              <div
                className="buttons"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "30px",
                }}>
                <button className="edit-btn" onClick={modalChange}>
                  Unmatch User
                </button>
              </div>

              <div
                className="buttons"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "30px",
                }}>
                <button className="edit-btn">Report User</button>
              </div>
            </>
          )}
        </div>
      </ExploreLayout>
      <div className={`modal-user ${matchModal ? "transit" : ""}`}>
        <img src={blur} alt="" />
        <div className="modal-div" style={{opacity: matchModal ? 1 : 0}}>
          <div className=" texts">
            <img src={cross} alt="" />
            <p className="text">Unmatch user</p>
          </div>

          <button className="unmatch" onClick={modalChange}>
            {" "}
            Unmatch
          </button>
          <button className="cancel"> Cancel</button>
        </div>
      </div>
    </>
  );
};

export default MatchedUser;

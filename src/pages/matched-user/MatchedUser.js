import React, {useEffect, useState} from "react";

import "./../../assets/css/viewProfile.scss";
import "./../../assets/css/modal.scss";
import {useNavigate, useParams} from "react-router-dom";
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
import UserServices from "../../services/userServices";
import toastMsg from "../../utils/toastify";

const MatchedUser = () => {
  let subtitle;

  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [singleData, setSingleData] = useState({});
  let dispatch = useDispatch();
  const {matchModal} = useSelector((state) => state.utils);
  const navigate = useNavigate();
  const {gender} = useSelector((state) => state?.auth?.user);
  let modalChange = () => {
    console.log("matchModal", matchModal);

    if (matchModal === true) dispatch(setMatchModal(false));
    else dispatch(setMatchModal(true));
  };

  // console.log(gender, "gender");
  const {id, appId, route} = useParams();
  // console.log(id, appId, route, "dfdk");
  async function fetchShortUser() {
    setLoading(true);

    let response = await ExploreServices.getSingleShortList(appId);
    console.log(response, "response");
    if (response?.status === 200) {
      setLoading(false);
      setSingleData(response.data);
    }
  }
  async function fetchMatchUser() {
    setLoading(true);

    let response = await ExploreServices.getSingleMatchList(id);
    console.log(response, "response");
    if (response?.status === 200) {
      setLoading(false);
      setSingleData(response.data);
    }
  }
  async function fetchLikedUser() {
    setLoading(true);

    let response = await ExploreServices.getSingleLiked(id);
    console.log(response, "response");
    if (response.status === 200) {
      setLoading(false);
      setSingleData(response.data);
    }
  }
  let getActiveSlide = async (task, id) => {
    if (task === "like") {
      let res = await UserServices.like_user(
        route === "shortList" ? appId : id
      );
      if (res.status === 200) {
        toastMsg.success(res.data.message);
        navigate(-1);
      } else {
        console.log(res, "res from like");
        toastMsg.error(res.response.data.message, "hello");
      }
    } else if (task === "dislike") {
      let res = await UserServices.dislike_user(id);
      if (res.status === 200) {
        toastMsg.success(res.data.message);
      } else {
        console.log(res, "res from dislike");
        toastMsg.error(res.response.data.message, "hello");
      }
    } else if (task === "addShort_list") {
      addShortlist(id);
    } else if (task === "supper_like_submit") {
      let data = new FormData();

      data.append("superliked_app_user_id", id);
      let res = await ExploreServices.addSupperLike(data);
      if (res.status === 200) {
        toastMsg.success(res.data.message);

        // getData();
      } else {
        toastMsg.error(res.error.message);
        console.log(res, "res");
      }
    }
  };

  const addShortlist = async (id) => {
    let data = new FormData();

    data.append("shortlist_app_user_id", id);
    console.log(id, "id");

    const res = await ExploreServices.submitShortList(data);
    if (res.status === 200) {
      toastMsg.success(res.data.message);
      // getData();
    } else {
      console.log(res);

      toastMsg.error(res.response.data.message);
    }
  };

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
        <div className="itemss" onClick={() => getActiveSlide("dislike", id)}>
          <img src={dislike} alt="" />
        </div>
        {route === "liked" && (
          <div
            className="itemss"
            onClick={() => getActiveSlide("addShort_list", id)}>
            <img src={task} alt="" />
          </div>
        )}
        <div
          className="itemss"
          onClick={() => getActiveSlide("supper_like_submit", id)}>
          <img src={rocket} alt="" />
        </div>{" "}
        <div className="itemss" onClick={() => getActiveSlide("like", id)}>
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
            <img className="user-img" src={singleData?.app_user?.profile_img} />
            <h2>
              {singleData?.app_user?.full_name ??
                singleData?.app_user?.display_name}
            </h2>

            <p
              style={{
                textAlign: "Center",
              }}>
              <span className="short-description">
                {singleData?.app_user?.designation}
              </span>
              <span className="short-description">
                {singleData?.app_user?.current_city},
                {singleData?.app_user?.current_country},
              </span>
              <span className="short-description">
                Age {singleData?.app_user?.age}
              </span>
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
              University :{singleData?.app_user?.education3_institution}
              <br />
              College : {singleData?.app_user?.education2_institution}
              <br />
              School :{singleData?.app_user?.education1_institution}
            </p>

            <h4>Personal Details</h4>

            <p
              style={{
                color: "#000",

                fontSize: "14px",
              }}>
              Name :{" "}
              {singleData?.app_user?.full_name ??
                singleData?.app_user?.display_name}
              <br />
              Age :{singleData?.app_user?.age}
              <br />
              Gender :{singleData?.app_user?.gender}
              <br />
              Height :{singleData?.app_user?.height_feet} feet{" "}
              {singleData?.app_user?.height_inches} inches
              <br />
              Weight {singleData?.app_user?.weight}
              <br />
              Marital Status :{singleData?.app_user?.marital_status}
              <br />
              Marital Timing
              <br />
              Date of Birth :{singleData?.app_user?.date_of_birth}
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

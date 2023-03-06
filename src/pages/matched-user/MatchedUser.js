import React, {useEffect, useState} from "react";

import "./../../assets/css/viewProfile.scss";
import "./../../assets/css/modal.scss";
import {useNavigate, useParams} from "react-router-dom";
import ExploreServices from "../../services/exploreServices";

import dislike from "../../assets/imgs/dislike.svg";
import task from "../../assets/imgs/task.svg";
import rocket from "../../assets/imgs/rocket.svg";
import like from "../../assets/imgs/like.svg";
import useSWR from "swr";
import {useDispatch, useSelector} from "react-redux";
import {setMatchModal} from "../../redux/slices/utilsSlice";
import UserServices from "../../services/userServices";
import toastMsg from "../../utils/toastify";
import HomeLayout from "../../components/layouts/HomeLayout";
import fetcher from "../../utils/fetchData";
import ProfileImage from "../../components/ProfileImage";
import Loader from "../../components/Loader";

const MatchedUser = () => {
  const [modal, setModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [singleData, setSingleData] = useState({});

  // console.log(gender, "gender");
  const {id, appId, route} = useParams();
  //sazid
  const [uID, setUID] = useState();

  let dispatch = useDispatch();
  const {matchModal} = useSelector((state) => state.utils);
  const navigate = useNavigate();
  const {gender} = useSelector((state) => state?.auth?.user);

  let {group_1, group_2, group_3, group_4} =
    singleData?.structured_app_user_info?.app_user_detail ?? {};

  // console.log(homeData, homeError, isLoading, "group_1 group_2");

  let modalChange = () => {
    console.log("matchModal", matchModal);
    if (matchModal === true) dispatch(setMatchModal(false));
    else dispatch(setMatchModal(true));
  };

  console.log(id, route, "dfdk");
  async function fetchShortUser() {
    setLoading(true);

    let response = await ExploreServices.getSingleShortList(id);
    // console.log(response, "response");
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
      // setUID(response.data.app_user.id);
      setLoading(false);
      setSingleData(response.data);
    } else {
      setLoading(false);
    }
  }
  async function fetchLikedUser() {
    setLoading(true);

    let response = await ExploreServices.getSingleLiked(id);
    // console.log(response, "response");
    if (response.status === 200) {
      setLoading(false);
      setSingleData(response?.data);
    }
  }

  async function fetchHomeuser() {
    setLoading(true);

    let response = await ExploreServices.getSingleHomeuser(id);
    // console.log(response, "response");
    if (response.status === 200) {
      setLoading(false);
      setSingleData(response.data);
    } else {
      setLoading(false);
    }
  }

  let getActiveSlide = async (task, id) => {
    if (task === "like") {
      let res = await UserServices.like_user(id);
      if (res.status === 200) {
        toastMsg.success(res.data.message);
        navigate(-1);
      } else {
        toastMsg.error(res.response.data.message, "hello");
      }
    } else if (task === "dislike") {
      let res = await UserServices.dislike_user(id);
      if (res.status === 200) {
        toastMsg.success(res.data.message);
      } else {
        // console.log(res, "res from dislike");
        toastMsg.error(res.response.data.message, "hello");
      }
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

  const handleUnmatch = async (id) => {
    let data = new FormData();
    data.append("match_record_id", id);
    const res = await ExploreServices.unMatchUser(data);

    if (res.status === 200) {
      toastMsg.success("Unmatched successfully");
      navigate("/explore?Match-list");
      dispatch(setMatchModal(false));
      // getShortisted();
    }
  };

  const viewGallery = () => {
    // console.log(uID);
    navigate(`/user-info/${id}/gallery`);
  };

  useEffect(() => {
    console.log("hello route");
    if (route === "shortList") {
      fetchShortUser();
    } else if (route === "match") {
      fetchMatchUser();
    } else if (route == "like") {
      fetchLikedUser();
    } else if (route === "home") {
      fetchHomeuser();
    }
  }, [id, route]);
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
        </div>
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

  let userInfo2 = (
    <div className="explore_viewProfile text-center">
      <div className="content-container">
        <ProfileImage
          url={singleData?.structured_app_user_info?.profile_img}
          gender={gender?.toLowerCase()?.trim() === "male" ? "female" : "male"}
        />
        {["shortList", "like"].includes(route) && (
          <div
            className="like-btn"
            style={{position: "relative", marginBottom: "20px"}}>
            <div className="body-bottom">
              <div className="items">
                <div
                  onClick={() => getActiveSlide("dislike", id)}
                  className="item"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Dislike">
                  <img src="/img/dislike.svg" alt="" />
                </div>
                {/* <div
                className="item"
                data-toggle="tooltip"
                data-placement="top"
                title="Short list">
                <img src="/img/task.svg" alt="" />
              </div> */}
                <div
                  onClick={() => getActiveSlide("supper_like_submit", id)}
                  className="item"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Super Like">
                  <img src="/img/rocket.svg" alt="" />
                </div>
                <div
                  onClick={() => getActiveSlide("like", id)}
                  className="item"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Like">
                  <img src="/img/like.svg" alt="" />
                </div>
                {/* <div></div> */}
              </div>
            </div>
          </div>
        )}

        <h2 style={{fontSize: 28, paddingTop: "20px"}}>
          {singleData?.structured_app_user_info?.sub_header[0]}
        </h2>
        {singleData?.structured_app_user_info?.sub_header.map((item, index) => {
          if (index == 0) return;
          return (
            <p
              style={{
                textAlign: "Center",
              }}>
              {/* <span className="short-description">
              {singleData?.app_user?.designation}
            </span>
            <span className="short-description">
              {singleData?.app_user?.current_city},
              {singleData?.app_user?.current_country},
            </span> */}
              <span className="short-description">{item}</span>
            </p>
          );
        })}

        <h4
          style={{
            paddingLeft: 20,
          }}>
          {group_1?.title}
        </h4>

        <p
          style={{
            color: "#000",

            fontSize: "14px",
          }}>
          {group_1?.data?.map((info, index) => (
            <p style={{color: "#000"}}>
              {info} <br />
            </p>
          ))}
        </p>

        <h4
          style={{
            paddingLeft: 20,
          }}>
          {group_2?.title}
        </h4>

        <p
          style={{
            color: "#000",

            fontSize: "14px",
          }}>
          {group_2?.data?.map((info, index) => (
            <p style={{color: "#000"}}>
              {info} <br />
            </p>
          ))}
        </p>

        <h4
          style={{
            paddingLeft: 20,
          }}>
          {group_3?.title}
        </h4>

        <p
          style={{
            color: "#000",

            fontSize: "14px",
          }}>
          {group_3?.data?.map((info, index) => (
            <p style={{color: "#000"}}>
              {info} <br />
            </p>
          ))}
        </p>

        <h4
          style={{
            paddingLeft: 20,
          }}>
          {group_4?.title}
        </h4>

        <p
          style={{
            color: "#000",

            fontSize: "14px",
          }}>
          {group_4?.data?.map((info, index) => (
            <p style={{color: "#000"}}>
              {info} <br />
            </p>
          ))}
        </p>
      </div>

      <div
        className="buttons"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "30px",
        }}>
        <button className="edit-btn" onClick={viewGallery}>
          View Gallery
        </button>
      </div>
      {route === "match" && (
        <div
          className="buttons"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "30px",
            position: "relative",
            cursor: "pointer",
          }}>
          <button className="edit-btn" onClick={modalChange}>
            Unmatch
          </button>
          <div
            className={`pop-up ${
              matchModal ? "active-pop" : "deactive-pop "
            } `}>
            <div
              className="unmatch-btns"
              style={{display: matchModal ? "flex" : "none"}}>
              <p className="text-dark fw-bold">
                Are you sure you want to unmatch this user?
              </p>
              <div className="d-flex g-4">
                <button
                  onClick={() => handleUnmatch(singleData?.match_id)}
                  className=""
                  style={{
                    width: "110px",
                    height: "40px",
                    textAlign: "center",
                    border: "none",
                    background: "#ffb7ac",
                    borderRadius: "30px",
                  }}>
                  Unmatch
                </button>
                <button
                  onClick={modalChange}
                  className=""
                  style={{
                    width: "110px",
                    height: "40px",
                    textAlign: "center",
                    border: "none",
                    background: "#ffb7ac",
                    borderRadius: "30px",
                    marginLeft: "20px",
                  }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div style={{height: "100px"}}></div>
    </div>
  );

  return (
    <>
      <HomeLayout footer={footer} match={singleData?.match_id}>
        {loading ? <div className="load">Loading...</div> : userInfo2}
      </HomeLayout>
    </>
  );
};

export default MatchedUser;

// import axios from 'axios'

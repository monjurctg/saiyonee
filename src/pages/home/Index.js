import React, {useCallback, useEffect, useState} from "react";
import HomeLayout from "../../components/layouts/HomeLayout";
import nouser from "../../assets/imgs/nouser.png";
import male from "../../assets/imgs/male.png";
import female from "../../assets/imgs/female.png";

import UserServices from "../../services/userServices";
import Swipers from "../../components/home/Swipers";

import {useLocation, useNavigate} from "react-router-dom";
import {getToken} from "../../utils/functions";
import setRouteToken from "../../utils/tokenSet";
import {useDispatch, useSelector} from "react-redux";
import {set_is_ques} from "../../redux/slices/utilsSlice";
import QuestionServices from "../../services/questionServices";

function Index() {
  const [data, setData] = useState(null);
  const [likeSlide, setLikeSlide] = useState("");
  // console.log('data in ', data)
  const [gettingUser, setgettingUser] = useState(false);
  // console.log('gettingUser', gettingUser)
  const navigate = useNavigate();
  let getData = async () => {
    setgettingUser(true);
    let res = await UserServices.filter_users();
    console.log("ressss", res.data?.filtered_users[0]);
    if (res.status === 200) {
      setgettingUser(false);
      setData(res.data?.filtered_users[0]);
    }
    // let data = await res.json()
  };

  if (getToken()) {
    setRouteToken(getToken());
  }

  const dispatch = useDispatch();

  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const getCondition = useCallback(async () => {
    const token = getToken();

    const res = await QuestionServices.getQuestions();
    console.log(res, "res from home");

    if (res.status === 200) {
      setLoading(false);

      if (res.data.form_field_questions.length > 0) {
        dispatch(set_is_ques(true));
        navigate("/question/1");
      } else {
        dispatch(set_is_ques(false));
      }
    } else {
      setLoading(false);
      dispatch(set_is_ques(false));
    }

    // setVarification(res);
  }, []);
  if (location.pathname === "/register/email") {
    // console.log(true, "path");
  } else {
    localStorage.setItem("regStart", false);
  }

  useEffect(() => {
    getCondition();
  }, []);

  const getBoomData = useCallback(async () => {
    const res = await UserServices.getBoomUsers();
    if (res.status === 200) {
      if (res.data.matched_users.length > 0) navigate("/boom");
    }
  }, []);

  useEffect(() => {
    getData();
    getBoomData();
  }, []);

  // console.log('data', data)
  // console.log('filtered_users', data?.filtered_users.length === 0 && !gettingUser )
  // console.log('data?.filtered_users.length > 0 && !gettingUser', data?.filtered_users.length > 0 && !gettingUser)
  console.log(data, "data");

  let show = "";
  if (data && !gettingUser) {
    show = (
      <Swipers
        getData={getData}
        data={data}
        likeSlide={likeSlide}
        setLikeSlide={setLikeSlide}
      />
    );
  } else if (gettingUser) {
    show = (
      <div
        className="d-flex justify-content-center align-items-center "
        style={{
          height: "100%",
          fontSize: 20,
          color: "black",
          fontWeight: 700,
        }}>
        Loading data
      </div>
    );
  } else if (data?.filtered_users?.length === 0 && !gettingUser) {
    show = (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          height: "100%",
          fontSize: 20,
          color: "black",
          fontWeight: 700,
        }}>
        {/* <img src="img/loading.gif" alt="" /> */}
        No matched user found
      </div>
    );
  }
  // console.log("show", show);
  return (
    <HomeLayout background={"#F9FAFB"} mTop={40}>
      <div className="d-flex justify-content-center">
        <div
          className={`body-div inside ${likeSlide}`}
          style={{
            // backgroundRepeat: "round",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "90%",
            backgroundImage: `url(${
              data?.id && data?.profile_image_url
                ? data?.profile_image_url
                : data?.gender === "male"
                ? male
                : data?.gender === "female"
                ? female
                : nouser
            })`,
          }}>
          {/* <div className="menu">
          <img src="img/menu_top.svg" alt="" />
        </div> */}
          {show}
        </div>
      </div>
      {/* <div className="body-div-lower01"></div>
      <div className="body-div-lower02"></div> */}
    </HomeLayout>
  );
}

export default Index;

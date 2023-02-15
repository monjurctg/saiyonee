import React, {useCallback, useEffect, useState} from "react";
import HomeLayout from "../../components/layouts/HomeLayout";
import nouser from "../../assets/imgs/nouser.png";
import male from "../../assets/imgs/male.png";
import female from "../../assets/imgs/female.png";

import UserServices from "../../services/userServices";
import Swipers from "../../components/home/Swipers";

import {Link, useLocation, useNavigate} from "react-router-dom";
import {getToken} from "../../utils/functions";
import setRouteToken from "../../utils/tokenSet";
import {useDispatch, useSelector} from "react-redux";
import {set_is_ques} from "../../redux/slices/utilsSlice";
import QuestionServices from "../../services/questionServices";
import {setCurrentUser} from "../../redux/slices/authSlices";
import PreferenceServices from "../../services/preferenceServices";
import {setPreviousPreference} from "../../redux/slices/preferenceSlice";

function Index() {
  const [data, setData] = useState(null);
  const [likeSlide, setLikeSlide] = useState("");
  const [isLimited, setIslimited] = useState(false);
  const [isFilterModalShow, setFilterModalShow] = useState(false);
  const [filterErrorMessage, setFilterErrorMessage] = useState(
    " আপনার দেয়া ফিল্টার অনুযায়ী আর কোন প্রোফাইল আমাদের কাছে নেই। আরও প্রোফাইল দেখতে চাইলে আপনার ফিল্টার চেঞ্জ করুন"
  );
  // console.log('data in ', data)
  const [gettingUser, setgettingUser] = useState(false);
  // console.log('gettingUser', gettingUser)
  const navigate = useNavigate();
  let getData = async () => {
    setgettingUser(true);
    let res = await UserServices.filter_users();

    if (res.status === 200) {
      setgettingUser(false);
      setData(res.data?.filtered_users[0]);
    } else {
      setgettingUser(false);
      setFilterErrorMessage(res.response.data.message);
      setFilterModalShow(res.response.data.show_in_modal);
    }

    setgettingUser(false);

    // let data = await res.json()
  };

  if (getToken()) {
    setRouteToken(getToken());
  }

  const dispatch = useDispatch();

  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = async () => {
    const res = await UserServices.UserProfile();
    if (res.status === 200) {
      dispatch(setCurrentUser(res.data));
      // console.log(res.data);
    }
  };
  const fetchPreviousPreference = useCallback(async () => {
    const res = await PreferenceServices.getPreferenceData();
    if (res.status === 200) {
      dispatch(setPreviousPreference(res.data.profile_preferences));
    } else {
      // console.log(res);
    }
  }, [dispatch]);

  useEffect(() => {
    // console.log(navigator.onLine, "onlie");

    const token = getToken();
    if (token) {
      fetchPreviousPreference();
      fetchCurrentUser();
    }
  }, []);

  const getCondition = useCallback(async () => {
    const token = getToken();

    const res = await QuestionServices.getQuestions();
    // console.log(res, "res from home");

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

  const noUser = (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",

        padding: 20,
      }}>
      {isLimited ? (
        <div style={{marginTop: "80px"}}>
          <p style={{fontWeight: "bold"}}>
            {" "}
            You have reached daily free profile view limit. To view 5 profiles
            daily, please upgrade to "Premium Membership". You can purchase
            "Premium Membership" by calling 01327230288
          </p>

          <p>
            আজকের মত ফ্রি বায়োডাটা লিমিট শেষ। অনুগ্রহ করে আগামীকাল আবার লগইন
            করুন। প্রতিদিন ৫ টি বায়োডাটা দেখার জন্য আমাদের "প্রিমিয়াম মেম্বারশিপ
            নিতে পারেন। "প্রিমিয়াম মেম্বারশিপ নেয়ার জন্য কল করুন ০১৩২৭২৩০২৮৮
          </p>
          <div
            onClick={() => setIslimited(false)}
            style={{
              color: "black",
              // border: "1px solid gray",
              // textDecoration: "underline",
              width: "60%",
              // padding: 10,
              background: "#ffb7ac",
              cursor: "pointer",
              margin: "0 auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}>
            <p style={{textAlign: "center", paddingTop: "12px"}}> Go to home</p>
          </div>
        </div>
      ) : (
        <div>
          <div style={{marginTop: "100px"}}>
            {/* <p style={{fontWeight: "bold"}}>
              No profiles available based on your filter. To see more profiles,
              please change your filter
            </p>
            <p>
              আপনার দেয়া ফিল্টার অনুযায়ী আর কোন প্রোফাইল আমাদের কাছে নেই। আরও
              প্রোফাইল দেখতে চাইলে আপনার ফিল্টার চেঞ্জ করুন
            </p> */}

            <p style={{fontWeight: "bold"}}>
              {filterErrorMessage.split("88.")[0] + "88."}
            </p>
            <p>{filterErrorMessage.split("88.")[1]}</p>
          </div>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}>
            <Link to={"/preference"}>
              <a
                href="#"
                style={{
                  color: "black",
                  background: "#ffb7ac",
                  // border: "1px solid gray",
                  // textDecoration: "underline",
                  padding: 10,
                  borderRadius: 10,
                }}>
                Change filter
              </a>
            </Link>
          </div>
        </div>
      )}
    </div>
  );

  let show = "";
  if (data && !gettingUser) {
    show = (
      <Swipers
        isLimited={isLimited}
        setIslimited={setIslimited}
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
          fontSize: 17,
          color: "black",
          fontWeight: 700,
        }}>
        {/* {console.log("Loading from condition")} */}
        Please wait for the next profile...
      </div>
    );
  } else if (data?.filtered_users?.length === 0 && !gettingUser) {
    show = (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100%",
          fontSize: 20,
          fontWeight: 700,
        }}>
        {/* <img src="img/loading.gif" alt="" /> */}

        {/* {console.log("Not Found")} */}
        <span>No matched user found</span>
      </div>
    );
  }
  // console.log("show", show);
  return (
    <HomeLayout background={"#F9FAFB"} mTop={40}>
      <div className="d-flex justify-content-center ">
        {isLimited || isFilterModalShow ? (
          ""
        ) : (
          <div
            onClick={() => navigate(`/user-info/home/${data?.id}`)}
            style={{
              position: "relative",
              left: "80%",
              top: "30px",
              height: 25,
              width: 70,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#ffb7ac",
              borderRadius: 10,
              zIndex: "999999",
              cursor: "pointer",
            }}>
            <div className="d-flex  justify-content-around align-items-center">
              <span>
                <img
                  src="/img/eye2.svg"
                  alt=""
                  style={{height: 20, width: 17}}
                />
              </span>
              <span style={{fontSize: 12, marginLeft: 4}}>View</span>
            </div>
          </div>
        )}

        {/* <Link
          to={data?.id ? `/user-info/home/${data?.id}` : "/home"}
          style={{color: "black"}}> */}
        <div
          className={`body-div inside ${likeSlide}`}
          style={{
            // backgroundRepeat: "round",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "90%",
            backgroundImage: `url(${
              isLimited
                ? ""
                : data?.profile_image_url
                ? data?.profile_image_url
                : data?.gender.toLowerCase() === "male"
                ? male
                : data?.gender.toLowerCase() === "female"
                ? female
                : ""
            })`,
          }}>
          {/* <div className="menu">
          <img src="img/menu_top.svg" alt="" />
        </div> */}
          {isLimited ? noUser : show ? show : isFilterModalShow ? noUser : ""}
        </div>
        {/* </Link> */}
      </div>

      {/* <div className="body-div-lower01"></div>
      <div className="body-div-lower02"></div> */}
    </HomeLayout>
  );
}

export default Index;

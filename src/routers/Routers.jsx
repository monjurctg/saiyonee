import React, {Suspense, lazy, useEffect, useState} from "react";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";

import GetStarted from "../pages/GetStart";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import FamilyInfo from "../pages/register/FamilyInfo";
import Location from "../pages/register/Location";
import Ocupation from "../pages/register/Ocupation";
import PersonalInformation from "../pages/register/PersonalInformation";
import RegisterEmail from "../pages/register/RegisterEmail";
import RegisterUserType from "../pages/register/RegisterUserType";
import Tutorial from "../pages/Tutorial";
import PrivateRoute from "./PrivateRoute";
import Varification from "../pages/register/Varification";
import RegSuccess from "../pages/register/RegSuccess";
import Religions from "../pages/register/Religions";
import MaritalStatus from "../pages/register/MaritalStatus";
import EducationTypes1 from "../pages/register/EducationTypes1";
import EducationTypes2 from "../pages/register/EducationTypes2";
import EducationTypes4 from "../pages/register/EducationType4";
import EducationType3 from "../pages/register/EducationType3";
import OcupationTypes from "../pages/register/OcupationTypes";
import Industry from "../pages/register/Industry";

import Settings from "../pages/settings/Settings";
import Welcome from "../pages/Welcome";
import {useDispatch, useSelector} from "react-redux";
import Question from "../pages/questions/Question";
import RegisterRoute from "./RegisterRoute";
import NotVarified from "./NotVarified";
import {getToken} from "../utils/functions";
import setRouteToken from "../utils/tokenSet";
import AddPhoto from "../pages/questions/AddPhoto";
import SelfieVerification from "../pages/questions/SelfieVerification";
import ReviewProfile from "../pages/ReviewProfile";
import Preference from "../pages/home/Preference";
import Explore from "../pages/home/Explore";
import PublicRoute from "./PublicRoute";

import PreferenceModule from "../pages/home/PreferenceModule";

import Boom from "../pages/home/Boom";
import ForgotPass from "../pages/forgotPass/ForgotPass";
import ResetPass from "../pages/forgotPass/ResetPass";
import Success from "../pages/forgotPass/Success";
import Help from "../pages/Help";
import QuestionServices from "../services/questionServices";
import ChatIndex from "../pages/chats/Index";
import {
  setEditData,
  set_is_ques,
} from "../redux/slices/utilsSlice";
// import EditProfileModule from "../pages/editProfile/EditProfileModule";
import ChatBox from "../pages/chats/ChatBox";
import SocialLogin from "../pages/social/SocialLogin";
import Register from "../pages/social-login/Register";
import EmailVerication from "../pages/register/EmailVerication";
import VerifyEmail from "../pages/VerifyEmail";
import {useCallback} from "react";
import GalleryImage from "../pages/settings/GalleryImage";
import ViewGallery from "../pages/viewGallery/ViewGallery"; 
import UserServices from "../services/userServices";
import { setPreviousPreference } from "../redux/slices/preferenceSlice";
import PreferenceServices from "../services/preferenceServices";
import { setEditProfile, setEditProfileImage } from "../redux/slices/editProfileslice";
import MainSkeleton from "../components/loader/MainSkeleton";
let MatchedUser = lazy(()=>import("./../pages/matched-user/MatchedUser"))
let Index = lazy(()=>import("../pages/home/Index"))
let ViewProfile = lazy(()=>import("../pages/settings/ViewProfile"))
let Education = lazy(()=>import("../pages/register/Education"))
let EditProfileModule = lazy(()=>import("../pages/editProfile/EditProfileModule"))
let EditProfile =lazy(()=>import("../pages/editProfile/EditProfile")) ;
let LocationCountry =lazy(()=>import("../pages/register/LocationCountry")) ;
let LocationCity =lazy(()=>import("../pages/register/LocationCity")) ;




function Routers() {
  // console.log("getToken()", getToken());

  const {email} = useSelector((state) => state.auth);

  // console.log("email", email);
  if (getToken()) {
    setRouteToken(getToken());
  }
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const location = useLocation();
  const [loading, setLoading] = useState(true);


  const fetchPreviousPreference =useCallback( async () => {
    const res = await PreferenceServices.getPreferenceData();
    if (res?.status === 200) {
      dispatch(setPreviousPreference(res.data.profile_preferences));
    } else {
      // console.log(res);
    }
  },[]); 
  const getCondition = useCallback(async () => {
    const token = getToken();

    const res = await QuestionServices.getQuestions();
    // console.log(res, "res from home");
    if (!res) {
      setLoading(false);
    }

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

  const fetchEditUser = async () => {
    const res = await UserServices.getEditData();
    if (res?.status === 200) {
      dispatch(setEditData(res.data));
      dispatch(setEditProfile(res.data))
      dispatch(setEditProfileImage(res?.data?.profile_img))
      // console.log(res.data,"edit data")

      // console.log(res.data);
    }
  };

 
  useEffect(() => {
    getCondition();
    fetchPreviousPreference()
    fetchEditUser()
  }, []);

  // setTimeout(() => {
  //   setLoading(false);
  // }, 1000);
  //  console.log('location', location)
  return (
    <div
      style={{
        width: "100%",
        height: "100%",

        background: location.pathname === "/register/email" ? "" : "#e9ecef3b",
      }}>
      {loading ? (
         <MainSkeleton/>
      ) : (
        <Suspense fallback={<MainSkeleton/>}>

        <Routes>

          <Route element={<PublicRoute />}>
            <Route path="/" element={<Welcome />} />
            <Route path="/tutorial" element={<Tutorial />} />
            <Route path="/get-start" element={<GetStarted />} />
            <Route path="/social-login" element={<SocialLogin />} />
            <Route path="/social-login/register" element={<Register />} />

            <Route path="/login" element={<Login />} />
            <Route path="/forgot-pass" element={<ForgotPass />} />
            <Route path="/reset-pass" element={<ResetPass />} />
            <Route path="/success-change-pass" element={<Success />} />
          </Route>

          <Route element={<RegisterRoute />}>
            {/* register process routing */}
            <Route path="/register/email" element={<RegisterEmail />} />
            <Route path="/help" element={<Help />} />
            {email && (
              <>
                <Route
                  path="/register/usertype"
                  element={<RegisterUserType />}
                />
                <Route
                  path="register/personal-info"
                  element={<PersonalInformation />}
                />
                <Route
                  path="register/personalinfo/religion"
                  element={<Religions />}
                />
                <Route
                  path="register/personalinfo/marital_status"
                  element={<MaritalStatus />}
                />
                {/* personal info route end */}

                {/* education type */}
                <Route path="/register/education" element={<Education />} />
                <Route
                  path="/register/education/type1"
                  element={<EducationTypes1 />}
                />
                <Route
                  path="/register/education/type2"
                  element={<EducationTypes2 />}
                />
                <Route
                  path="/register/education/type3"
                  element={<EducationType3 />}
                />
                <Route
                  path="/register/education/type4"
                  element={<EducationTypes4 />}
                />

                {/* education type end */}

                {/* ocupation type */}
                <Route path="register/ocupation" element={<Ocupation />} />
                <Route
                  path="register/ocupation/type"
                  element={<OcupationTypes />}
                />

                <Route
                  path="register/ocupation/industry"
                  element={<Industry />}
                />

                {/* ocupation route end */}

                {/* location route  */}

                <Route path="/register/location" element={<Location />} />
                <Route
                  path="/register/location/country"
                  element={<LocationCountry />}
                />

                <Route
                  path="/register/location/city"
                  element={<LocationCity />}
                />

                {/* location route   end*/}

                <Route path="register/family_info" element={<FamilyInfo />} />
                <Route
                  path="register/varification"
                  element={<Varification />}
                />
              </>
            )}

            {/* register process done */}
          </Route>

          {/* Sazid */}
          {/* not varified */}

          <Route element={<NotVarified />}>
            <Route path="/email-verification" element={<EmailVerication />} />
            <Route path="/success" element={<RegSuccess />} />
            <Route path="/review" element={<RegSuccess />} />
          </Route>

          <Route path="/verify-email" element={<VerifyEmail />} />

          <Route element={<PrivateRoute />}>
            <Route path="/question/image" element={<AddPhoto />} />
            <Route
              path="/question/selfie-verification"
              element={<SelfieVerification />}
            />
            <Route path="/question/:id" element={<Question />} />

            <Route path="/preference" element={<Preference />} />
            <Route path="/preference/:module" element={<PreferenceModule />} />
              
           


            <Route
              path="/editProfile/:module"
              element={<EditProfileModule />}
            /> 

<Route path="/edit/profile" element={<EditProfile />} />
           

            <Route path="/review/profile" element={<ReviewProfile />} />

            <Route path="/settings" element={<Settings />} />

            <Route path="/image/gallery" element={<GalleryImage />} />

            <Route path="/home" element={<Index />} />
            <Route path="/explore" element={<Explore />} />

            {/* <Route path="/home" element={<Home />} /> */}
            <Route path="/viewProfile" element={<ViewProfile />} />
            <Route path="/boom" element={<Boom />} />
            <Route path="/chat/room/:id" element={<ChatBox />} />

            <Route path="/user-info/:route/:id" element={<MatchedUser />} />

            <Route path="/user-info/:id/gallery" element={<ViewGallery />} />

            <Route path="/message" element={<ChatIndex />} />
          </Route>

          {/* <Route path="/explore" element={<Explore />} /> */}
          <Route path="*" element={<NotFound />} />

        </Routes>
        </Suspense>

      )}
    </div>
  );
}

export default Routers;

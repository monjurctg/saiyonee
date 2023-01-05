import React, {useEffect, useState} from "react";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import GetStarted from "../pages/GetStart";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Education from "../pages/register/Education";
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
import Index from "../pages/home/Index";
import EducationTypes1 from "../pages/register/EducationTypes1";
import EducationTypes2 from "../pages/register/EducationTypes2";
import EducationTypes4 from "../pages/register/EducationType4";
import EducationType3 from "../pages/register/EducationType3";
import OcupationTypes from "../pages/register/OcupationTypes";
import Industry from "../pages/register/Industry";
import LocationCountry from "../pages/register/LocationCountry";
import LocationCity from "../pages/register/LocationCity";
import Settings from "../pages/settings/Settings";
import EditProfile from "../pages/editProfile/EditProfile";
// import Explore from "../pages/Explore";
import Welcome from "../pages/Welcome";
import {useDispatch, useSelector} from "react-redux";
import Question from "../pages/questions/Question";
import RegisterRoute from "./RegisterRoute";
import NotVarified from "./NotVarified";
import {setIsVarified} from "../redux/slices/authSlices";
import {getToken} from "../utils/functions";
import setRouteToken from "../utils/tokenSet";
import AddPhoto from "../pages/questions/AddPhoto";
import SelfieVerification from "../pages/questions/SelfieVerification";
import ReviewProfile from "../pages/ReviewProfile";
import Preference from "../pages/home/Preference";
import Explore from "../pages/home/Explore";
import PublicRoute from "./PublicRoute";

import PreferenceModule from "../pages/home/PreferenceModule";

import ViewProfile from "../pages/settings/ViewProfile";
import Boom from "../pages/home/Boom";
import ForgotPass from "../pages/forgotPass/ForgotPass";
import ResetPass from "../pages/forgotPass/ResetPass";
import Success from "../pages/forgotPass/Success";
import Help from "../pages/Help";
import QuestionServices from "../services/questionServices";
import MatchedUser from "./../pages/matched-user/MatchedUser";
import ChatIndex from "../pages/chats/Index";
import {
  set_is_image,
  set_is_ques,
  set_is_selfie,
} from "../redux/slices/utilsSlice";
import EditProfileModule from "../pages/editProfile/EditProfileModule";
import ChatBox from "../pages/chats/ChatBox";

function Routers() {
  // console.log("getToken()", getToken());
  if (getToken()) {
    setRouteToken(getToken());
  }
  const dispatch = useDispatch();
  const [varification, setVarification] = useState({});

  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCondition = async () => {
      const res = await QuestionServices.routeData();
      console.log(res, "Res");
      const {addImg, selfie, ques} = res;
      // setVarification(res);
      if (addImg) {
        dispatch(set_is_image(true));
      } else {
        dispatch(set_is_image(false));
      }
      if (selfie) {
        dispatch(set_is_selfie(true));
      } else {
        dispatch(set_is_selfie(false));
      }
      if (ques.length <= 0) {
        dispatch(set_is_ques(true));
      } else {
        dispatch(set_is_ques(false));
      }
    };

    if (location.pathname === "/register/email") {
      // console.log(true, "path");
    } else {
      localStorage.setItem("regStart", false);
    }
    getCondition();
  }, []);

  setTimeout(() => {
    setLoading(false);
  }, 3000);
  //  console.log('location', location)
  return (
    <div
      style={{
        width: "100%",
        height: "100%",

        background: location.pathname === "/register/email" ? "" : "#e9ecef3b",
      }}>
      {loading ? (
        <div className="load">Loading...</div>
      ) : (
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Welcome />} />
            <Route path="/tutorial" element={<Tutorial />} />
            <Route path="/get-start" element={<GetStarted />} />

            <Route path="/login" element={<Login />} />
            <Route path="/forgot-pass" element={<ForgotPass />} />
            <Route path="/reset-pass" element={<ResetPass />} />
            <Route path="/success-change-pass" element={<Success />} />
          </Route>

          <Route element={<RegisterRoute />}>
            {/* register process routing */}
            <Route path="/register/email" element={<RegisterEmail />} />
            <Route path="/register/usertype" element={<RegisterUserType />} />
            <Route path="/help" element={<Help />} />

            {/* personal info route start */}
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

            <Route path="register/ocupation/industry" element={<Industry />} />

            {/* ocupation route end */}

            {/* location route  */}

            <Route path="/register/location" element={<Location />} />
            <Route
              path="/register/location/country"
              element={<LocationCountry />}
            />

            <Route path="/register/location/city" element={<LocationCity />} />

            {/* location route   end*/}

            <Route path="register/family_info" element={<FamilyInfo />} />

            <Route path="register/varification" element={<Varification />} />

            {/* register process done */}
          </Route>

          {/* Sazid */}
          {/* not varified */}
          <Route element={<NotVarified />}>
            <Route path="/success" element={<RegSuccess />} />
            <Route path="/reveiw" element={<RegSuccess />} />
          </Route>

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

            <Route path="/review/profile" element={<ReviewProfile />} />

            <Route path="/settings" element={<Settings />} />

            <Route path="/edit/profile" element={<EditProfile />} />
            <Route path="/home" element={<Index />} />
            <Route path="/explore" element={<Explore />} />

            {/* <Route path="/home" element={<Home />} /> */}
            <Route path="/viewProfile" element={<ViewProfile />} />
            <Route path="/boom" element={<Boom />} />
            <Route path="/chat/room" element={<ChatBox />} />

            <Route
              path="/user-info/:route/:id/:appId"
              element={<MatchedUser />}
            />

            <Route path="/message" element={<ChatIndex />} />
          </Route>

          {/* <Route path="/explore" element={<Explore />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </div>
  );
}

export default Routers;

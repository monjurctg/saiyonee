import React, {useEffect} from "react";
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
import Explore from "../pages/Explore";
import Welcome from "../pages/Welcome";
import {useSelector} from "react-redux";
import Question from "../pages/questions/Question";

function Routers() {
  const location = useLocation();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const registerStart = localStorage.getItem("regStart");
  //   // console.log(registerStart);
  //   if (location.pathname === "/register/email") {
  //     // console.log(true, "path");
  //   } else {
  //     localStorage.setItem("regStart", false);
  //   }
  //   if (registerStart) {
  //     // console.log("first");

  //     navigate("/register/email", {replace: true});
  //     // navigate(1);
  //   } else {
  //     return;
  //   }
  // }, []);
  //  console.log('location', location)
  return (
    <div
      style={{
        background: location.pathname === "/register/email" ? "" : "#e9ecef3b",
      }}>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/get-start" element={<GetStarted />} />
        <Route path="/login" element={<Login />} />

        {/* Sazid */}
        <Route path="/settings" element={<Settings />} />
        <Route path="/editProfile" element={<EditProfile />} />

        {/* register process routing */}
        <Route path="/register/email" element={<RegisterEmail />} />
        <Route path="/register/usertype" element={<RegisterUserType />} />

        {/* personal info route start */}
        <Route
          path="register/personal-info"
          element={<PersonalInformation />}
        />
        <Route path="register/personalinfo/religion" element={<Religions />} />
        <Route
          path="register/personalinfo/marital_status"
          element={<MaritalStatus />}
        />
        {/* personal info route end */}

        {/* education type */}
        <Route path="/register/education" element={<Education />} />
        <Route path="/register/education/type1" element={<EducationTypes1 />} />
        <Route path="/register/education/type2" element={<EducationTypes2 />} />
        <Route path="/register/education/type3" element={<EducationType3 />} />
        <Route path="/register/education/type4" element={<EducationTypes4 />} />

        {/* education type end */}

        {/* ocupation type */}
        <Route path="register/ocupation" element={<Ocupation />} />
        <Route path="register/ocupation/type" element={<OcupationTypes />} />

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
        <Route path="success" element={<RegSuccess />} />

        {/* register process done */}


        <Route element={<PrivateRoute />}>
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/question/:id" element={<Question />} />
          {/* <Route path="/home" element={<Home />} /> */}
        </Route>
        <Route path="/home" element={<Index />} />
        <Route path="/explore" element={<Explore />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default Routers;

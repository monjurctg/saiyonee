import React from "react";
import {Route, Routes} from "react-router-dom";
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
import Wellcome from "../pages/Wellcome";
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
import LocationCountry from "../pages/register/LocationCountry";
import LocationCity from "../pages/register/LocationCity";

function Routers() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Wellcome />} />
        <Route path="/get-start" element={<GetStarted />} />
        <Route path="/login" element={<Login />} />

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
        <Route path="register/success" element={<RegSuccess />} />

        {/* register process done */}

        <Route element={<PrivateRoute />}>
          <Route path="/tutorial" element={<Tutorial />} />
          {/* <Route path="/home" element={<Home />} /> */}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default Routers;

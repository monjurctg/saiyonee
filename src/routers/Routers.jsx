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
        <Route
          path="register/personal-info"
          element={<PersonalInformation />}
        />
        <Route path="/register/education" element={<Education />} />
        <Route path="/register/location" element={<Location />} />

        <Route path="register/ocupation" element={<Ocupation />} />
        <Route path="register/family_info" element={<FamilyInfo />} />

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

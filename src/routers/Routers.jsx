import React from "react";
import {Route, Routes} from "react-router-dom";
import GetStarted from "../pages/GetStart";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Education from "../pages/register/Education";
import PersonalInformation from "../pages/register/PersonalInformation";

import RegisterEmail from "../pages/register/RegisterEmail";
import RegisterUserType from "../pages/register/RegisterUserType";
import Tutorial from "../pages/Tutorial";
import PrivateRoute from "./PrivateRoute";

function Routers() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* register process routing */}
        <Route path="/register/email" element={<RegisterEmail />} />
        <Route path="/register/usertype" element={<RegisterUserType />} />
        <Route path="/register/education" element={<Education />} />

        <Route
          path="register/personal-info"
          element={<PersonalInformation />}
        />

        <Route path="/get-start" element={<GetStarted />} />

        <Route element={<PrivateRoute />}>
          <Route path="/tutorial" element={<Tutorial />} />

          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default Routers;

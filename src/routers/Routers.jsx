import React from "react";
import {Route, Routes} from "react-router-dom";
import GetStarted from "../pages/GetStart";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import Tutorial from "../pages/Tutorial";
import PrivateRoute from "./PrivateRoute";

function Routers() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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

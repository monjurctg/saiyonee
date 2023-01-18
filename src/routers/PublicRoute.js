import {useState} from "react";
import {useSelector} from "react-redux";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {getToken} from "../utils/functions";

function PublicRoute({varification}) {
  // let auth = useAuth();
  const {isEmptyQuestion, isProfileQuesionExist, isSelfieQuestionExist} =
    useSelector((state) => state.utils);

  let auth = getToken();
  let location = useLocation();
  const isVarified = localStorage.getItem("isVarified");
  const isBanned = localStorage.getItem("is_banned");
  const isAlreadySetPreference = JSON.parse(localStorage.getItem("preference"));
  console.log(
    isEmptyQuestion,
    isProfileQuesionExist,
    isAlreadySetPreference,
    isBanned,
    "from public route"
  );
  if (auth && !isEmptyQuestion) {
    return <Navigate to="/question/1" state={{from: location}} />;
  }
  if (auth && isVarified == 1 && !isProfileQuesionExist) {
    return <Navigate to="/question/image" state={{from: location}} />;
  }

  if (auth && isVarified == 1 && !isSelfieQuestionExist) {
    return (
      <Navigate to="/question/selfie-verification" state={{from: location}} />
    );
  }

  if (auth && isVarified == 1 && isBanned == 0 && isAlreadySetPreference) {
    return <Navigate to="/home" state={{from: location}} />;
  }

  return <Outlet />;
}
export default PublicRoute;

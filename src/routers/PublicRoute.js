import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import QuestionServices from "../services/questionServices";
import {getToken} from "../utils/functions";

function PublicRoute() {
  // let auth = useAuth();
  const {isEmptyQuestion, isProfileQuesionExist, isSelfieQuestionExist} =
    useSelector((state) => state.utils);
  console.log(isEmptyQuestion, "question");
  let auth = getToken();
  let location = useLocation();
  const isVarified = localStorage.getItem("isVarified");

  const isBanned = localStorage.getItem("is_banned");
  const profile_image = localStorage.getItem("profile_image");
  const selfie_image = localStorage.getItem("selfie_image");

  const emailVerified = localStorage.getItem("emailVerified");
  const isAlreadySetPreference = localStorage.getItem("preference");

  // const [quesLength, setQuesLength] = useState(0);
  // let getQuestions = async () => {
  //   let res = await QuestionServices.getQuestions();
  //   // console.log("res", res.data.form_field_questions);
  //   // console.log('res', res)
  //   if (res.status === 200) {
  //     setQuesLength(res.data.form_field_questions?.length);
  //   } else {
  //   }
  // };
  // useEffect(() => {
  //   getQuestions();
  // }, []);

  if (
    auth &&
    isVarified === "true" &&
    isBanned === "false" &&
    emailVerified === "true" &&
    isAlreadySetPreference === "true"
  ) {
    return <Navigate to="/home" state={{from: location}} />;
  } else if (
    auth &&
    isVarified === "true" &&
    isBanned === "false" &&
    emailVerified === "true" &&
    isAlreadySetPreference === "false" &&
    profile_image === "false" &&
    isEmptyQuestion
  ) {
    return <Navigate to="/question/1" state={{from: location}} />;
  } else if (
    auth &&
    isVarified === "true" &&
    isBanned === "false" &&
    emailVerified === "true" &&
    isAlreadySetPreference === "false" &&
    profile_image === "false"
  ) {
    return <Navigate to="/question/image" state={{from: location}} />;
  } else if (
    auth &&
    isVarified === "true" &&
    isBanned === "false" &&
    emailVerified === "true" &&
    isAlreadySetPreference === "false" &&
    selfie_image === "false"
  ) {
    return (
      <Navigate to="/question/selfie-verification" state={{from: location}} />
    );
  } else if (
    auth &&
    isVarified === "true" &&
    isBanned === "false" &&
    emailVerified === "true" &&
    isAlreadySetPreference === "false" &&
    selfie_image !== "false" &&
    profile_image !== "false"
  ) {
    return <Navigate to="/preference" state={{from: location}} />;
  }

  // <!--Start of Tawk.to Script-->

  // <!--End of Tawk.to Script-->

  // if (
  //   auth &&
  //   isBanned === "false" &&
  //   isVarified === "true" &&
  //   emailVerified === "true" &&
  //   isAlreadySetPreference === "false"
  // ) {
  //   return <Navigate to="/question/1" state={{from: location}} />;
  // } else if (
  //   auth &&
  //   isBanned === "false" &&
  //   isVarified === "false" &&
  //   emailVerified === "false" &&
  //   isAlreadySetPreference === "false"
  // ) {
  //   return <Navigate to="/question/1" state={{from: location}} />;
  // } else if (
  //   (auth && isBanned === "false" && isVarified === "false",
  //   emailVerified === "true" && isAlreadySetPreference === "false")
  // ) {
  //   return <Navigate to="/success" state={{from: location}} />;
  // } else if (
  //   auth &&
  //   isVarified === "true" &&
  //   isProfileQuesionExist === "false"
  // ) {
  //   return <Navigate to="/question/image" state={{from: location}} />;
  // } else if (
  //   auth &&
  //   isVarified === "true" &&
  //   isSelfieQuestionExist === "false"
  // ) {
  //   return (
  //     <Navigate to="/question/selfie-verification" state={{from: location}} />
  //   );
  // }

  // if (
  //   auth &&
  //   isVarified === "true" &&
  //   isBanned === "false" &&
  //   isAlreadySetPreference === "true"
  // ) {
  //   console.log("hello publick", isAlreadySetPreference);
  //   return <Navigate to="/home" state={{from: location}} />;
  // }

  return <Outlet />;
}
export default PublicRoute;

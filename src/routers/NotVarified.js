import {Navigate, Outlet, useLocation} from "react-router-dom";

function NotVarified() {
  console.log('first')
  const isVerified = localStorage.getItem("isVerified");
  const is_banned = localStorage.getItem("is_banned");
  const emailVerified = localStorage.getItem("emailVerified");


  
  // d");
  // let auth = getToken()
  let location = useLocation();

  if (isVerified == "false" && emailVerified !== "true") {
    return <Navigate to="/get-start" state={{from: location}} />;
  }

  return <Outlet />;
}
export default NotVarified;

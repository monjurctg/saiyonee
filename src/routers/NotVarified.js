import {Navigate, Outlet, useLocation} from "react-router-dom";

function NotVarified() {
  const isVerified = localStorage.getItem("isVerified");
  const is_banned = localStorage.getItem("is_banned");
  console.log("isVerified");
  // let auth = getToken()
  let location = useLocation();

  if (isVerified != 0 && is_banned != 0) {
    return <Navigate to="/get-start" state={{from: location}} />;
  }

  return <Outlet />;
}
export default NotVarified;

import {Navigate, Outlet, useLocation} from "react-router-dom";

function NotVarified() {
  const isVerified = localStorage.getItem("isVerified");
  const is_banned = localStorage.getItem("is_banned");

  // let auth = getToken()
  let location = useLocation();

  if (isVerified != 0) {
    return <Navigate to="/get-start" state={{from: location}} />;
  }

  return <Outlet />;
}
export default NotVarified;

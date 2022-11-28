import {Navigate, Outlet, useLocation} from "react-router-dom";

function NotVarified() {
  const isVerified = 0;
  // let auth = getToken()
  let location = useLocation();

  if (isVerified !== 0 || isVerified !== null) {
    return <Navigate to="/success" state={{from: location}} />;
  }

  return <Outlet />;
}
export default NotVarified;

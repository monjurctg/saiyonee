import {Navigate, Outlet, useLocation} from "react-router-dom";

function PrivateRoute() {
  // let auth = useAuth();
  let auth = true;
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/get-start" state={{from: location}} />;
  }

  return <Outlet />;
}
export default PrivateRoute;

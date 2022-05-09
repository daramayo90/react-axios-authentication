import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function RequireAuth({ allowedRoles }) {
  const { auth } = useAuth();
  const location = useLocation();

  /*
  *  1. Find if the user has the allowed role to access the page
  *  2. If it's okey, it shows the corresponding page => Outlet (Nested links)
  *  3. If it's not, sent the user to the 'Unauthorized' component
  *       auth?.user => the 'user' is only added to be able to put the '?' in the verification
  *       If anything is added, the '?' will not be possible to add
  *  4. If there is no user at all, send it to the 'login' page
  */
  return (
    auth?.roles?.find(role => allowedRoles?.includes(role))
        ? <Outlet />
        : auth?.roles
            ? <Navigate to="/unauthorized" state={{ from: location }} replace />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;

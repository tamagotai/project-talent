import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RoleAuthRoute({ allowedRoles, children }) {
  const { user } = useAuth();
  const location = useLocation();
  
  return allowedRoles && user && allowedRoles.includes(user.role_id)
        ? children || <Outlet />
        : <Navigate to="/unauthorised" state={{ from: location }} replace />
}

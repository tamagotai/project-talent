import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RequireAuth({ allowedRoles }) {
    const { user } = useAuth();
    const location = useLocation();
    return allowedRoles && user
      ? allowedRoles.includes(user.role_id)
        ? <Outlet />
        : <Navigate to="/unauthorised" state={{ from: location }} replace />
      : user
        ? <Outlet />
        : <Navigate to="/login" state={{ from: location }} replace />;
}

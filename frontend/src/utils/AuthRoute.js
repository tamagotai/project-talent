import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";


export default function AuthRoute() {
    const { isAuthenticated } = useAuth();
    const location =useLocation();
    
    return isAuthenticated 
        ? <Outlet /> 
        : <Navigate to="/login" state={{ from: location }} replace />;
}
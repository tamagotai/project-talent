import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function useAuth() {
    const context = useContext(AuthContext);
    console.log("AuthContext Value:", context);
    const { isLoading, isAuthenticated, user, dispatch, logout } = context;
    return { isLoading, isAuthenticated, user, dispatch, logout };
}

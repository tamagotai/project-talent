import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function useAuth() {
//   return useContext(AuthContext);
    const { isLoading, isAuthenticated, user } = useContext(AuthContext);
    return { isLoading, isAuthenticated, user };
}

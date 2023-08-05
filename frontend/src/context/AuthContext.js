import { createContext, useReducer, useEffect } from "react";
// import { useLogout } from "../hooks/useLogout";

const AuthContext = createContext({});

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      console.log("User logged in:", action.payload);
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'LOGOUT':
      return { user: null, isAuthenticated: false }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
      user: null,
      isAuthenticated: false,
    })

    // const logout = useLogout();
    const logout = () => {
      localStorage.removeItem('user'); // Clear the user from local storage
      localStorage.removeItem('token'); // Clear the token from local storage
      dispatch({ type: 'LOGOUT' }); // Dispatch logout action
    }

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'))
  
      if (user) {
        dispatch({ type: 'LOGIN', payload: user }) 
      }
    }, [])

    console.log('AuthContext state:', state)

    return (
        <AuthContext.Provider value={{ ...state, dispatch, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
import { createContext, useReducer, useEffect } from "react";

const AuthContext = createContext({});

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      console.log("User logged in:", action.payload);
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
      user: null
    })

    const logout = () => {
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
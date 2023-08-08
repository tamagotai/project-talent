import { createContext, useReducer, useEffect } from "react";
import axios from "../api/axios";

const AuthContext = createContext({});

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      console.log("User logged in:", action.payload);
      return { ...state, user: action.payload, isAuthenticated: true, isLoading: false };
    case 'LOGOUT':
      return { user: null, isAuthenticated: false, isLoading: false }
    case 'DONE_LOADING':
      return { ...state, isLoading: false };
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    isLoading: true
  })

  const logout = async () => {
    try {
        // Send POST request to backend to log out
        const response = await axios.post('/users/logout');
        
        if (response.status === 200) {
            console.log(response.data.message); // Log the success message
            localStorage.removeItem('user');  // Clear the user from local storage
            localStorage.removeItem('token'); // Clear the token from local storage
            dispatch({ type: 'LOGOUT' });    // Dispatch logout action
        }
    } catch (error) {
        console.error("Error logging out:", error); // Handle any errors here
    }
  };  

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (user && token) {
      dispatch({ type: 'LOGIN', payload: user }) 
    }
    dispatch({ type: 'DONE_LOADING' })
  }, [])

  console.log('AuthContext state:', state)

  return (
      <AuthContext.Provider value={{ ...state, dispatch, logout }}>
          {children}
      </AuthContext.Provider>
  )
}

export default AuthContext;
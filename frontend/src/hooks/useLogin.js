import { useState } from "react"
import useAuth from "./useAuth"
import axios from "../api/axios"

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuth()

  const login = async (usernameOrEmail, password) => {
    setIsLoading(true);
    setError(null);
    console.log("Sending login request with:", { usernameOrEmail, password }); // Log the request data
    try {
      const response = await axios.post('/users/login', {
        usernameOrEmail,
        password,
      });
      console.log("Login response received:", response); // Log the response
      if (response.status !== 200) {
        throw new Error('Something went wrong with the login.');
      }
  
      const json = await response.data;
  
      //save the user to local storage
      localStorage.setItem('user', JSON.stringify(json));
      //update the auth context
      dispatch({ type: 'LOGIN', payload: json });
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    } finally {
      //update loading state
      setIsLoading(false);
    }
  };

  return { login, isLoading, error }
}

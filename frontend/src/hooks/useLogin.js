import { useState } from "react"
import useAuth from "./useAuth"
import axios from "../api/axios"
import { useNavigate } from "react-router-dom"

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuth()
  const navigate = useNavigate()

  const login = async (usernameOrEmail, password) => {
    setIsLoading(true);
    setError(null);
    console.log("Sending login request with:", { usernameOrEmail, password }); // Log the request data
    try {
      const response = await axios.post('/users/login', {
        usernameOrEmail,
        password,
      });
      // Log the response
      console.log("Login response received:", response); 
      
      if (response.status !== 200) {
        throw new Error('Something went wrong with the login.');
      }
      
      const { user, token, message } = await response.data;
      console.log('Login success:', message);

      //save the user and token to local storage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      //update the auth context
      dispatch({ type: 'LOGIN', payload: user });
      
      // navigate to dashboard on successful login
      console.log('User logged in successfully. Redirecting to dashboard...');
      navigate("/dashboard");
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

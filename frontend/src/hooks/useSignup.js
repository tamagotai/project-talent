import { useState } from "react"
import useAuth from "./useAuth"
import axios from "../api/axios"
import { useNavigate } from "react-router-dom"

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuth()
    const navigate = useNavigate()

    const signup = async (role, username, firstname, lastname, email, mobile, landline, password) => {
      setIsLoading(true);
      setError(null);
      // convert role to a number
      const role_id = Number(role);
  
      console.log("Sending signup request with:", { role_id, username, firstname, lastname, email, mobile, landline, password }); // Log the request data
      try {
        const response = await axios.post('/users/register', {
          role_id,
          username,
          firstname,
          lastname,
          email,
          mobile,
          landline,
          password,
        });
        console.log("Signup response received:", response); // Log the response
        if (response.status !== 201) {
          throw new Error('Something went wrong with the registration.');
        }
    
        const { user, token, message } = await response.data;
        console.log('Signup success:', response.data.message);
    
        //save the user and token to local storage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);

        //update the auth context
        dispatch({ type: 'LOGIN', payload: user });
        
        // navigate to dashboard on successful signup
        console.log('User sign up successfully. Redirecting to dashboard...');
        navigate("/dashboard");
      } catch (error) {
        setIsLoading(false);
        // Check if the error response from axios contains a message
        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message); // Set the API's error message
        } else {
          setError(error.message); // Set a general error message
        }
      } finally {
        setIsLoading(false);
      }
    };
  return { signup, isLoading, error }
}

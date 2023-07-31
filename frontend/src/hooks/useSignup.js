import { useState } from "react"
import useAuth from "./useAuth"
import axios from "../api/axios"

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuth()

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
  return { signup, isLoading, error }
}

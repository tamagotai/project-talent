import { useState } from "react"
import useAuth from "./useAuth"
import axios from "../api/axios"

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuth()

    const signup = async (role, username, firstname, lastname, email, mobile, landline, password) => {
        setIsLoading(true)
        setError(null)
        // convert role to a number
        const role_id = Number(role);
        
        const response = await axios.post('/auth/register', {
            role_id,
            username,
            firstname,
            lastname,
            email,
            mobile,
            landline,
            password,
          })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            //save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))
            //update the auth context
            dispatch({type: 'LOGIN', payload: json})
            //update loading state
            setIsLoading(false)
        }
    }
  return { signup, isLoading, error }
}

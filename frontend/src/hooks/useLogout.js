// import { useContext } from "react";
// import axios from "../api/axios";
// import AuthContext from "../context/AuthContext";

// export const useLogout = () => {
//     const { dispatch } = useContext(AuthContext);

//     const logout = async () => {
//         try {
//             // Send POST request to backend to log out
//             const response = await axios.post('/users/logout');
            
//             if (response.status === 200) {
//                 console.log(response.data.message); // Log the success message
                
//                 // Clear the user and token from local storage
//                 localStorage.removeItem('user');
//                 localStorage.removeItem('token');
                
//                 // Dispatch logout action to update context state
//                 dispatch({ type: 'LOGOUT' });
//             }
//         } catch (error) {
//             console.error("Error logging out:", error);
//             throw error;  // You can propagate the error up to handle it in components or other hooks
//         }
//     };

//     return logout;
// };
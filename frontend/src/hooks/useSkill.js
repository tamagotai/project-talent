import { useState } from "react";
import axios from "../api/axios";

const useSkill = () => {
    const [allSkills, setAllSkills] = useState([]);
    const [userSkills, setUserSkills] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    const getAllSkills = async () => {
        setLoading(true);
        try {
            const res = await axios.get('/skills/all', {
              headers: {'Authorization': `Bearer ${token}`}
            });
            setAllSkills(res.data);
            setError(null);
          } catch (error) {
            console.error("Error fetching users:", error);
            setError(error);
          } finally {
            setLoading(false);
          }
      };

    const getUserSkills = async (userId) => {
        setLoading(true);
        try {
            const res = await axios.get(`/skills/user/${userId}`, {
                headers: {'Authorization': `Bearer ${token}`}
            });
            setUserSkills(res.data);
            setError(null);
          } catch (error) {
            console.error("Error fetching users:", error);
            setError(error);
          } finally {
            setLoading(false);
          }
      };
    
    return {
        allSkills,
        userSkills,
        loading,
        error,
        getAllSkills,
        getUserSkills
    };
};

export default useSkill;
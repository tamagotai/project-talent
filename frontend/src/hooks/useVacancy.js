import { useState } from "react";
import axios from "../api/axios";

const useVacancy = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  const getAllVacancies = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/vacancies', {
        headers: {'Authorization': `Bearer ${token}`}
      });
      setData(res.data);
      setError(null);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching vacancies:", error);
    } finally {
      setLoading(false);
    }
  };

  const getVacancyById = async (vacancyId) => {
    setLoading(true);
    try {
      const res = await axios.get(`/vacancies/${vacancyId}`, {
        headers: {'Authorization': `Bearer ${token}`}
      });
      setData(res.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

//   const updateVacancy = async (vacancyId, updatedData) => {
//     setLoading(true);
//     try {
//       await axios.put(`/vacancies/${vacancyId}`, updatedData, {
//         headers: {'Authorization': `Bearer ${token}`}
//       });
//       setError(null);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteVacancy = async (vacancyId) => {
//     setLoading(true);
//     try {
//       await axios.delete(`/vacancies/${vacancyId}`, {
//         headers: {'Authorization': `Bearer ${token}`}
//       });
//       setError(null);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

  return {
    data,
    loading,
    error,
    getAllVacancies,
    getVacancyById
  };
}

export default useVacancy;

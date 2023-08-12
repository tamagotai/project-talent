import { useState } from "react";
import axios from "../api/axios";

const useTalent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  const getAllTalents = async () => {
    setLoading(true);
    try {
        const res = await axios.get('/users/talents', {
          headers: {'Authorization': `Bearer ${token}`}
        });
        setData(res.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching talents:", error);
      } finally {
        setLoading(false);
      }
  };

  const getTalentById = async (talentId) => {
    setLoading(true);
    try {
      const res = await axios.get(`/talents/${talentId}`, {
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

  const updateTalent = async (talentId, updatedData) => {
    setLoading(true);
    try {
      await axios.put(`/talents/${talentId}`, updatedData, {
        headers: {'Authorization': `Bearer ${token}`}
      });
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteTalent = async (talentId) => {
    setLoading(true);
    try {
      await axios.delete(`/talents/${talentId}`, {
        headers: {'Authorization': `Bearer ${token}`}
      });
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    getAllTalents,
    getTalentById,
    updateTalent,
    deleteTalent
  };
}

export default useTalent;
import { useState } from "react";
import axios from "../api/axios";

const useUser = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  const getAllUsers = async () => {
    setLoading(true);
    try {
        const res = await axios.get('/users', {
          headers: {'Authorization': `Bearer ${token}`}
        });
        setData(res.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
  };

  const getUserById = async (userId) => {
    setLoading(true);
    try {
      const res = await axios.get(`/users/${userId}`, {
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

  const updateUser = async (userId, updatedData) => {
    setLoading(true);
    try {
      await axios.put(`/users/${userId}`, updatedData, {
        headers: {'Authorization': `Bearer ${token}`}
      });
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    setLoading(true);
    try {
      await axios.delete(`/users/${userId}`, {
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
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
  };
}

export default useUser;
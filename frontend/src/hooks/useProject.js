import { useState } from "react";
import axios from "../api/axios";

const useProject = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  console.log("project data:", data)

  const getAllProjects = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/projects', {
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

  const getProjectById = async (projectId) => {
    setLoading(true);
    try {
      const res = await axios.get(`/projects/${projectId}`, {
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

  const updateProject = async (projectId, updatedData) => {
    setLoading(true);
    try {
      await axios.put(`/projects/${projectId}`, updatedData, {
        headers: {'Authorization': `Bearer ${token}`}
      });
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (projectId) => {
    setLoading(true);
    try {
      await axios.delete(`/projects/${projectId}`, {
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
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
  };
}

export default useProject;
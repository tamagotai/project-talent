import { useState, useEffect } from "react";
import axios from "../api/axios";

const useProject = (query) => {
    const [data, setData] = useState([]);
    const token = localStorage.getItem('token');

    const getAllProjects = async () => {
        try {
            const res = await axios.get('/projects', {
              headers: {'Authorization': `Bearer ${token}`}
            });
            setData(res.data);
          } catch (error) {
            console.error("Error fetching projects:", error);
          }
    }

    useEffect(() => {        
        if (query.length === 0 || query.length > 2) getAllProjects();
    }, [query]);

    return data;
}

export default useProject;
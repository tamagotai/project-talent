import { useState, useEffect } from "react";
import axios from "../api/axios";

const useTalent = (query) => {
    const [data, setData] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchTalents = async () => {
          try {
            const res = await axios.get('/users/talents', {
              headers: {'Authorization': `Bearer ${token}`}
            });
            setData(res.data);
          } catch (error) {
            console.error("Error fetching talents:", error);
          }
        };
        
        if (query.length === 0 || query.length > 2) fetchTalents();
    }, [query]);

    return data;
}

export default useTalent;
import { useState, useEffect } from "react";
import axios from "../api/axios";

const useUser = (query) => {
    const [data, setData] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const res = await axios.get('/users', {
              headers: {'Authorization': `Bearer ${token}`}
            });
            setData(res.data);
          } catch (error) {
            console.error("Error fetching users:", error);
          }
        };
        
        if (query.length === 0 || query.length > 2) fetchUsers();
      }, [query]);

      return data;
}

export default useUser;
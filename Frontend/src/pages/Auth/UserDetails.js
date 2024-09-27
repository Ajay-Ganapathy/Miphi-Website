import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocalContext } from '../../Context/context';

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //const {user} = useLocalContext();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/author/details`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        setError(error.response?.data?.message || 'Error fetching user details');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {user && (

<div class="flex justify-center">
<div class="">
<img  src= {`${process.env.REACT_APP_API_URL}/${user.profile_img}`}  alt="" className="w-32 h-32 mx-auto border-4 border-orange-400 rounded-full dark:bg-gray-500 aspect-square" />

      
    <p class="font-bold text-base  text-gray-400 pt-2 text-center w-24"> {user.name.split(" ")[0]} </p>
</div>
</div>
        
      )}
    </div>
  );
};

export default UserDetails;

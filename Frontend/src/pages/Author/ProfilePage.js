import React from 'react'
import { Link } from 'react-router-dom'
import { useState , useEffect } from 'react'
import axios from 'axios'


const ProfilePage = () => {

  const [user, setUser] = useState({

  
    name : '',
    username : '',
    profile_img : ''
});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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



  return (
    <div>
        
<main class="">
          
        <div class="grid mb-4 pb-10 px-8 mx-4 rounded-3xl bg-gray-100 border-4 border-green-400 " style = {{height : "80vh" }}>
          <div class="grid grid-cols-12 gap-6" style = {{display : "flex" , alignItems : "center" , justifyContent  : "center"}}>
                        <div class="grid grid-cols-12 col-span-12 gap-6 xxl:col-span-9">
                          
                            <div class="col-span-12 mt-8">
                             
                              <div className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 dark:bg-gray-50 dark:text-gray-800">
                                <img  src= {`${process.env.REACT_APP_API_URL}/${user.profile_img}`}  alt="" className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square" />
                                <div className="space-y-4 text-center divide-y dark:divide-gray-300">
                                  <div className="my-2 space-y-1">
                                    <h2 className="text-xl font-semibold sm:text-2xl">{user.name}</h2>
                                    <p className="px-5 text-xs sm:text-base dark:text-gray-600">{user.username}</p>
                                </div>
                                <div className="flex mt-2 justify-center">
                                 
                                  <Link to={`/author/profile/edit`} state={{ user }} className="btn bg-teal-500 text-white hover:bg-teal-600 py-2 px-4 rounded">
                                    Edit Profile
                                  </Link>
                                  
                                </div>
                              
                                </div>
                              </div>
                               
                          </div>
                        </div>
            </div>
          </div>
      </main>
    </div>
  )
}

export default ProfilePage;
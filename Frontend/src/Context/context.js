import { createContext } from "react";
import { useState, useEffect} from "react";
import { useContext } from "react";
import axios from "axios";


const AddContext = createContext()

export function useLocalContext()
{
  return useContext(AddContext)
}

export function ContextProvider({children})
{
 
  const [user , setUser] = useState([]);
  const [approvedBlogs, setApprovedBlogs] = useState([]);
  const [rejectedBlogs, setRejectedBlogs] = useState([]);
  const [pendingBlogs, setPendingBlogs] = useState([]);
  const [revertedBlogs , setRevertedBlogs ] = useState([]);
  const [draftedBlogs , setDraftedBlogs] = useState([]);
  const [blogs , setBlogs] = useState([]);
  const [count , setCount] = useState([]);
  const [userCount , setUserCount] = useState([]);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchUserDetails = async () => {
    setLoading(true); // Set loading to true at the start
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('No token found, redirecting to login');
        setLoading(false);
        // Optionally, redirect to login page here
        return;
      }

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/author/details`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);  // Assuming `setUser` updates the global user state
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error fetching user details';
      
      if (error.response?.status === 401) {
        // Token is invalid, clear localStorage and user data
        localStorage.removeItem('token');
        setUser(null);
        // Optionally, redirect to login page here
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);  // End loading whether the request succeeds or fails
    }
  };



  

  useEffect(() => {
       

    fetchUserDetails();
    fetchBlogs();
    fetchCount();
    if(user && user.id){
      fetchUserBlogs(user.id);
      fetchUserCount(user.id);
    }

}, []);

const fetchUserBlogs = async (userId) => {
  try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/blogs`);
      const filteredApproved = response.data.blogs.filter(blog => userId == blog.author_id && blog.status === 'Accept');
      const filteredRejected = response.data.blogs.filter(blog => userId == blog.author_id && blog.status === 'Reject');
      const filteredPending = response.data.blogs.filter(blog => userId == blog.author_id && blog.status === 'Pending');
      const filteredReverted = response.data.blogs.filter(blog => userId == blog.author_id && blog.status === 'Revert');
      const filteredDrafts = response.data.blogs.filter(blog => userId == blog.author_id && blog.status === 'Draft');
      setBlogs(response.data.blogs);
      setApprovedBlogs(filteredApproved);
      setRejectedBlogs(filteredRejected);
      setPendingBlogs(filteredPending);
      setRevertedBlogs(filteredReverted);
      setDraftedBlogs(filteredDrafts);
  } catch (error) {
      console.error('Error fetching blogs:', error);
      setError('Error fetching blogs');
  } finally {
      setLoading(false);
  }
};

const fetchBlogs = async () => {
  try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/blogs`);
      const filteredApproved = response.data.blogs.filter(blog =>  (blog.status === 'Accept' && blog.deleted_at == null) );
      const filteredRejected = response.data.blogs.filter(blog =>  (blog.status === 'Reject'  && blog.deleted_at == null));
      const filteredPending = response.data.blogs.filter(blog =>  (blog.status === 'Pending'  && blog.deleted_at == null));
  
      setBlogs(response.data.blogs);
      setApprovedBlogs(filteredApproved);
      setRejectedBlogs(filteredRejected);
      setPendingBlogs(filteredPending);
    
      
  } catch (error) {
      console.error('Error fetching blogs:', error);
      setError('Error fetching blogs');
  } finally {
      setLoading(false);
  }
};

const fetchCount = async () => {
  try{
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/blogs/count`);
    console.log(response)
   
    setCount(response.data);
    

  }catch(error){
    console.log("Error occured " , error);
    setError("Error Fetching Count ! ");
  }
}

  const fetchUserCount = async (userId) => {
    try{
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/blogs/count/${userId}`);
      console.log(response)
     
      setUserCount(response.data);
      

    }catch(error){
      console.log("Error occured " , error);
      setError("Error Fetching Count ! ");
    }
  }



  const value = {user , blogs , approvedBlogs , rejectedBlogs , revertedBlogs , pendingBlogs , draftedBlogs , fetchUserCount, count , userCount , setCount, setApprovedBlogs , setPendingBlogs , setRevertedBlogs , setRejectedBlogs , fetchBlogs , fetchCount , fetchUserBlogs};
  return <AddContext.Provider value = {value} >{children}</AddContext.Provider>
}
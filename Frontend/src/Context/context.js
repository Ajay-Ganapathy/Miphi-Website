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
  const [blogs , setBlogs] = useState([]);
  const [count , setCount] = useState([]);


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

  useEffect(() => {
       


    fetchBlogs();

}, []);

const fetchUserBlogs = async (userId) => {
  try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/blogs`);
      const filteredApproved = response.data.blogs.filter(blog => userId == blog.author_id && blog.status === 'Accept');
      const filteredRejected = response.data.blogs.filter(blog => userId == blog.author_id && blog.status === 'Reject');
      const filteredPending = response.data.blogs.filter(blog => userId == blog.author_id && blog.status === 'Pending');
      const filteredReverted = response.data.blogs.filter(blog => userId == blog.author_id && blog.status === 'Revert');
      setBlogs(response.data.blogs);
      setApprovedBlogs(filteredApproved);
      setRejectedBlogs(filteredRejected);
      setPendingBlogs(filteredPending);
      setRevertedBlogs(filteredReverted)
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
        const filteredApproved = response.data.blogs.filter(blog => blog.status === 'Accept');
        const filteredRejected = response.data.blogs.filter(blog =>  blog.status === 'Reject');
        const filteredPending = response.data.blogs.filter(blog =>  blog.status === 'Pending');
        const filteredReverted = response.data.blogs.filter(blog =>  blog.status === 'Revert');
        setBlogs(response.data.blogs);
        setApprovedBlogs(filteredApproved);
        setRejectedBlogs(filteredRejected);
        setPendingBlogs(filteredPending);
        setRevertedBlogs(filteredReverted);
        
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


  const value = {user , blogs , approvedBlogs , rejectedBlogs , revertedBlogs , pendingBlogs , count , setCount, setApprovedBlogs , setPendingBlogs , setRevertedBlogs , setRejectedBlogs , fetchBlogs , fetchCount };
  return <AddContext.Provider value = {value} >{children}</AddContext.Provider>
}
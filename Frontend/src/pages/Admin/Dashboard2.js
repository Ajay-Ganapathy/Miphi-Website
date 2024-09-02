import React from 'react'
import { useState , useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from '../../Components/Modal';
import { useNavigate } from 'react-router-dom';
const Dashboard2 = () => {

    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isOpens, setIsOpen] = useState(false);
  const [open , isOpen] = useState(false)
  const toggleOpen = () => setIsOpen(!isOpens);
  const [isItemOpen, setIsItemOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentBlogId, setCurrentBlogId] = useState(null);
  const [actionType, setActionType] = useState('');
  

  const toggleSideMenu = () => setIsSideMenuOpen(!isSideMenuOpen);
  const toggleNotificationsMenu = () => setIsNotificationsMenuOpen(!isNotificationsMenuOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  const toggleItemOpen = () => setIsItemOpen(!isItemOpen);
  const closeNotificationsMenu = () => setIsNotificationsMenuOpen(false);
  const closeProfileMenu = () => setIsProfileMenuOpen(false);
  const [remarks, setRemarks] = useState(''); 

  const [blogs, setBlogs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/blogs');
      setBlogs(response.data.blogs.sort((a,b) => b.id - a.id));
      console.log(blogs)
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleAccept = async (id , status) => {
    try {
     
      console.log(status === "Accept")
      await axios.put(`http://localhost:5000/blogs/${id}/status`, { status, remarks });
      console.log("Updated Success");

      if(status === "Accept"){
        setBlogs(
          blogs.map(blog =>
            blog.id === id ? { ...blog, status, remarks : " "} : blog
          )
        );
      }else{
        setBlogs(
          blogs.map(blog =>
            blog.id === id ? { ...blog, status, remarks } : blog
          )
        );
      }
     
    } catch (error) {
      console.error('Error updating blog status:', error);
    }
 
  };


  const handleReject = async (id , status , remarks) => {
    try {
     
  
      await axios.put(`http://localhost:5000/blogs/${id}/status`, { status, remarks });
      console.log("Updated Success" , remarks);

      if(remarks === ""){
        setBlogs(
          blogs.map(blog =>
            blog.id === id ? { ...blog, status, remarks : " "} : blog
          )
        );
      }else{
        setBlogs(
          blogs.map(blog =>
            blog.id === id ? { ...blog, status, remarks } : blog
          )
        );
      }
     
    } catch (error) {
      console.error('Error updating blog status:', error);
    }
 
  };


  const openModal = (id, type) => {
    setCurrentBlogId(id);
    setActionType(type);
    setModalOpen(true);
  };

  const handleConfirm = (remarks) => {
    if (actionType === "Reject") {
      handleReject(currentBlogId, "Reject" , remarks);
    } else {
      handleAccept(currentBlogId , "Accept");
    }
    setModalOpen(false);
  };


  return (
    <div>
       

<div className={`flex h-screen bg-gray-800 ${isSideMenuOpen ? 'overflow-hidden' : ''}`}>

       
        <aside class="z-20 flex-shrink-0 hidden w-60 pl-2 overflow-y-auto bg-gray-800 md:block">
            <div>
                <div class="text-white">
                    <div class="flex p-2  bg-gray-800">
                        <div class="flex py-3 px-2 items-center">
                            <p class="text-2xl text-green-500 font-semibold">Miphi </p> <p class="ml-2 font-semibold italic">
                            DASHBOARD</p>
                        </div>
                    </div>
                    <div class="flex justify-center">
                        <div class="">
                            <img class="hidden h-24 w-24 rounded-full sm:block object-cover mr-2 border-4 border-green-400"
                                src="https://image.flaticon.com/icons/png/512/149/149071.png" alt="" />
                            <p class="font-bold text-base  text-gray-400 pt-2 text-center w-24">Admin</p>
                        </div>
                    </div>
                    <div>
                        <ul class="mt-6 leading-10">
                            <li class="relative px-2 py-1 ">
                                <a class="inline-flex items-center w-full text-sm font-semibold text-white transition-colors duration-150 cursor-pointer hover:text-green-500" 
                                    href=" #">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    <span class="ml-4">DASHBOARD</span>
                                </a>
                            </li>

                            <li className="flex">
                    
                    <a
                      className="text-white inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800"
                      href="#"
                      onClick = {() => {
                      
                          localStorage.removeItem("token") ;
                          localStorage.removeItem("role") ;
                          navigate("/login")
                       
  
                      
                  }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4l4-4m0 upper-case 0l-4-4m4 4H7m6 4v-4m0 4v-4"
                        />
                      </svg>
                      <span>LOGOUT</span>
                    </a>
                  </li>
                            <li className="relative px-2 py-1">
      {/* <div
        className="inline-flex items-center justify-between w-full text-base font-semibold transition-colors duration-150 text-gray-500 hover:text-yellow-400 cursor-pointer"
        onClick={toggleOpen}
      >
        <span className="inline-flex items-center text-sm font-semibold text-white hover:text-green-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"
            />
          </svg>
          <span className="ml-4">ITEM</span>
        </span>

        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-1 text-white w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-1 text-white w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        )}
      </div> */}

      {/* <div
        style={{
          display: isOpen ? 'block' : 'none',
          transition: 'opacity 0.5s ease',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <ul className="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium rounded-md shadow-inner bg-green-400" aria-label="submenu">
          <li className="px-2 py-1 text-white transition-colors duration-150">
            <div className="px-1 hover:text-gray-800 hover:bg-gray-100 rounded-md">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <a href="#" className="w-full ml-2 text-sm font-semibold text-white hover:text-gray-800">
                  Item 1
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div> */}
    </li>
                        </ul>
                    </div>
                </div>
            </div>
        </aside>

    
       <>
       <CSSTransition
        in={isSideMenuOpen}
        timeout={150}
        classNames="fade"
        unmountOnExit
      ></CSSTransition>
       </>



<aside
  id="sideMenu"
  className={`fixed inset-y-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-gray-900 dark:bg-gray-800 md:hidden transform transition ease-in-out duration-150 ${
    isSideMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
  }`}
  style={{ display: isSideMenuOpen ? 'block' : 'none' }}
>
  <div>
    <div className="text-white">
      <div className="flex p-2 bg-gray-800">
        <div className="flex py-3 px-2 items-center">
          <p className="text-2xl text-green-500 font-semibold">Miphi</p>
          <p className="ml-2 font-semibold italic">DASHBOARD</p>
        </div>
      </div>
      <div>
        <ul className="mt-6 leading-10">
          <li className="relative px-2 py-1">
            <a
              className="inline-flex items-center w-full text-sm font-semibold text-white transition-colors duration-150 cursor-pointer hover:text-green-500"
              href="#"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="ml-4">DASHBOARD</span>
            </a>
          </li>
          {/* <li className="relative px-2 py-1">
            <div
              className="inline-flex items-center justify-between w-full text-base font-semibold transition-colors duration-150 text-gray-500 hover:text-yellow-400 cursor-pointer"
              onClick={toggleItemOpen}
            >
              <span className="inline-flex items-center text-sm font-semibold text-white hover:text-green-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"
                  />
                </svg>
                <span className="ml-4">ITEM</span>
              </span>
              {isItemOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1 text-white w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1 text-white w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              )}
            </div>

            {isItemOpen && (
              <div
                className="transition-all ease-in-out duration-300 opacity-100 max-h-xl"
                style={{ overflow: 'hidden' }}
              >
                <ul className="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium rounded-md shadow-inner bg-green-400">
                  <li className="px-2 py-1 text-white transition-colors duration-150">
                    <div className="px-1 hover:text-gray-800 hover:bg-gray-100 rounded-md">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                          />
                        </svg>
                        <a
                          href="#"
                          className="w-full ml-2 text-sm font-semibold text-white hover:text-gray-800"
                        >
                          Item 1
                        </a>
                      </div>
                    </div>
                  </li> */}
                {/* </ul>
              </div>
            )}
          </li> */}
        </ul>
      </div>
    </div>
  </div>
</aside>

      

        <div class="flex flex-col flex-1 w-full overflow-y-auto">

        <header className="z-40 py-4 bg-gray-800">
      <div className="flex items-center justify-between h-8 px-6 mx-auto">
        <button
          className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple"
          onClick={toggleSideMenu}
          aria-label="Menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </button>

        <div className="flex justify-center mt-2 mr-4">
          <div className="relative flex w-full flex-wrap items-stretch mb-3">
            <input
              type="search"
              placeholder="Search"
              className="form-input px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded-lg text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pr-10"
            />
            <span className="z-10 h-full leading-snug font-normal text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 -mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 1114 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>
        </div>

        <ul className="flex items-center flex-shrink-0 space-x-6">
          <li className="relative">
            <button
              className="p-2 bg-white text-green-400 align-middle rounded-full hover:text-white hover:bg-green-400 focus:outline-none"
              onClick={toggleNotificationsMenu}
              aria-label="Notifications"
              aria-haspopup="true"
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </div>
              <span aria-hidden="true" className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full"></span>
            </button>

            {isNotificationsMenuOpen && (
              <ul
                className="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-green-400 border border-green-500 rounded-md shadow-md"
                onClick={() => setIsNotificationsMenuOpen(false)}
                onKeyDown={(e) => e.key === 'Escape' && closeNotificationsMenu()}
              >
                <li className="flex">
                  <a
                    className="text-white inline-flex items-center justify-between w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800"
                    href="#"
                  >
                    <span>Messages</span>
                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-600 bg-red-100 rounded-full">
                      13
                    </span>
                  </a>
                </li>
              </ul>
            )}
          </li>

          <li className="relative">
            <button
              className="p-2 bg-white text-green-400 align-middle rounded-full hover:text-white hover:bg-green-400 focus:outline-none"
              onClick={toggleProfileMenu}
              aria-label="Account"
              aria-haspopup="true"
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </button>

            {isProfileMenuOpen && (
              <ul
                className="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-green-400 border border-green-500 rounded-md shadow-md"
                onClick={() => setIsProfileMenuOpen(false)}
                onKeyDown={(e) => e.key === 'Escape' && closeProfileMenu()}
                aria-label="submenu"
              >
                <li className="flex">
                  <a
                    className="text-white inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800"
                    href="#"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.341A8.038 8.038 0 0021 12.003c0-4.418-3.582-8-8-8-1.858 0-3.573.633-4.928 1.695M12 16v6m0 0H8m4 0h4" />
                    </svg>
                    <span>Profile</span>
                  </a>
                </li>
                <li className="flex">
                  <a
                    className="text-white inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800"
                    href="#"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                    <span>Settings</span>
                  </a>
                </li>
                <li className="flex">
                    
                  <a
                    className="text-white inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800"
                    href="#"
                    onClick = {() => {
					
						localStorage.removeItem("token") ;
						localStorage.removeItem("role") ;
						navigate("/login")
					 

					
				}}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4l4-4m0 0l-4-4m4 4H7m6 4v-4m0 4v-4"
                      />
                    </svg>
                    <span>Logout</span>
                  </a>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </header>
   
          
            <main class="">
          
                <div class="grid mb-4 pb-10 px-8 mx-4 rounded-3xl bg-gray-100 border-4 border-green-400">

                    <div class="grid grid-cols-12 gap-6">
                        <div class="grid grid-cols-12 col-span-12 gap-6 xxl:col-span-9">
                            <div class="col-span-12 mt-8">
                                <div class="flex items-center h-10 intro-y">
                                    <h2 class="mr-5 text-lg font-medium truncate">Dashboard</h2>
                                </div>
                                <div class="grid grid-cols-12 gap-6 mt-5">
                                    <a class="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                                        href="#">
                                        <div class="p-5">
                                            <div class="flex justify-between">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-blue-400"
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                </svg>
                                                <div
                                                    class="bg-green-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                                                    <span class="flex items-center">30%</span>
                                                </div>
                                            </div>
                                            <div class="ml-2 w-full flex-1">
                                                <div>
                                                    <div class="mt-3 text-3xl font-bold leading-8">4.510</div>

                                                    <div class="mt-1 text-base text-gray-600">Pending</div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                    <a class="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                                        href="#">
                                        <div class="p-5">
                                            <div class="flex justify-between">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-yellow-400"
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                </svg>
                                                <div
                                                    class="bg-red-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                                                    <span class="flex items-center">30%</span>
                                                </div>
                                            </div>
                                            <div class="ml-2 w-full flex-1">
                                                <div>
                                                    <div class="mt-3 text-3xl font-bold leading-8">4.510</div>

                                                    <div class="mt-1 text-base text-gray-600">Accepted</div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                    <a class="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                                        href="#">
                                        <div class="p-5">
                                            <div class="flex justify-between">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-pink-600"
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                                </svg>
                                                <div
                                                    class="bg-yellow-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                                                    <span class="flex items-center">30%</span>
                                                </div>
                                            </div>
                                            <div class="ml-2 w-full flex-1">
                                                <div>
                                                    <div class="mt-3 text-3xl font-bold leading-8">4.510</div>

                                                    <div class="mt-1 text-base text-gray-600">Rejected</div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                    <a class="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                                        href="#">
                                        <div class="p-5">
                                            <div class="flex justify-between">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-green-400"
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                                </svg>
                                                <div
                                                    class="bg-blue-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                                                    <span class="flex items-center">30%</span>
                                                </div>
                                            </div>
                                            <div class="ml-2 w-full flex-1">
                                                <div>
                                                    <div class="mt-3 text-3xl font-bold leading-8">4.510</div>

                                                    <div class="mt-1 text-base text-gray-600">Total</div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            {/* <div class="col-span-12 mt-5">
                                <div class="grid gap-2 grid-cols-1 lg:grid-cols-2">
                                    <div class="bg-white shadow-lg p-4" id="chartline"></div>
                                    <div class="bg-white shadow-lg" id="chartpie"></div>
                                </div>
                            </div> */}
                            <div class="col-span-12 mt-5">
                                <div class="grid gap-2 grid-cols-1 lg:grid-cols-1">
                                    <div class="bg-white p-4 shadow-lg rounded-lg">
                                        <h1 class="font-bold text-base">Blogs Submitted </h1>
                                        <div class="mt-4">
                                            <div class="flex flex-col">
                                                <div class="-my-2 overflow-x-auto">
                                                    <div class="py-2 align-middle inline-block min-w-full">
                                                        <div
                                                            class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white">
                                                            <table class="min-w-full divide-y divide-gray-200">
                                                                <thead>
                                                                    <tr>
                                                                        <th
                                                                            class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                                            <div class="flex cursor-pointer">
                                                                                <span class="mr-2">AUTHOR NAME</span>
                                                                            </div>
                                                                        </th>
                                                                        <th
                                                                            class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                                            <div class="flex cursor-pointer">
                                                                                <span class="mr-2">BLOG TITLE</span>
                                                                            </div>
                                                                        </th>
                                                                        <th
                                                                            class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                                            <div class="flex cursor-pointer">
                                                                                <span class="mr-2">BLOG CONTENT</span>
                                                                            </div>
                                                                        </th>
                                                                        
                                                                        <th
                                                                            class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                                            <div class="flex cursor-pointer">
                                                                                <span class="mr-2">STATUS</span>
                                                                            </div>
                                                                        </th>
                                                                        <th
                                                                            class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                                            <div class="flex cursor-pointer">
                                                                                <span class="mr-2">ACTION</span>
                                                                            </div>
                                                                        </th>
                                                                        <th
                                                                            class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                                            <div class="flex cursor-pointer">
                                                                                <span class="mr-2">REMARKS</span>
                                                                            </div>
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody class="bg-white divide-y divide-gray-200">
                                                                {
  blogs.map((blog) => {
    return (
      <tr key={blog.id}> {/* Ensure each row has a unique key */}
        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
          <p>{blog.author_name}</p>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
          <p>{blog.blog_title}</p>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
        <Link to={`/admin/blogs/${blog.id}`} 
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      
      >
        View Blog
      </Link>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
       
           
            {blog.status === 'Accept' && <span className="text-green-600">
                <div className="flex text-green-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
                Accepted
                </div>
                </span>}
                  {blog.status === 'Reject' &&<span className="text-red-600">
                <div className="flex text-red-500">
                <svg
  xmlns="http://www.w3.org/2000/svg"
  className="w-5 h-5 mr-1"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M6 18L18 6M6 6l12 12"
  />
</svg>
                Rejected
                </div>
                </span>}
                  {blog.status === 'Pending' && <span className="text-yellow-600">
                <div className="flex text-yellow-500">
           <svg
  xmlns="http://www.w3.org/2000/svg"
  className="w-5 h-5 mr-1"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M12 4v8m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  />
</svg>
                Pending
                </div>
                </span>}
         
        </td>
        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
          <div className="flex space-x-4">
            <button onClick = {() => openModal(blog.id , "Accept")} className="text-green-500 hover:text-green-600">

            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.707 5.293a1 1 0 00-1.414 0L10 13.586 5.707 9.293a1 1 0 00-1.414 1.414l5.5 5.5a1 1 0 001.414 0l9-9a1 1 0 000-1.414z" fill="#4CAF50"/>
            </svg>
              <p>Accept</p>
            </button>
            <button onClick = {() => openModal(blog.id , "Reject")}  className="text-red-500 hover:text-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-1 ml-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              <p>Reject</p>
            </button>

            <Modal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onConfirm={handleConfirm}
            status={actionType}
        />
          </div>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
          <p>{blog.remarks}</p>
        </td>
      </tr>
    );
  })
}
                                                          
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
 
    </div>
  )
}

export default Dashboard2
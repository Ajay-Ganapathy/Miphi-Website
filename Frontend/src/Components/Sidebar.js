import React from 'react'
import { useState , useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import UserDetails from '../pages/Auth/UserDetails';
import { useLocation } from 'react-router-dom';
import { useLocalContext } from '../Context/context';




const Sidebar = (props) => {

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
const [isMenu , setIsMenu] = useState(false);

const {user} = useLocalContext() ;
const navigate = useNavigate();
 const location = useLocation();
  


  return (
    
    <div>
      <button
        className="md:hidden fixed top-4 left-4 z-30 text-white bg-gray-800 p-2 rounded"
        onClick={() => setIsMenu(!isMenu)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
         <aside class="z-20 flex-shrink-0 hidden w-60 pl-2 overflow-y-auto bg-gray-800 md:block">
            <div>
                <div class="text-white">
                    <div class="flex p-2  bg-gray-800">
                        <div class="flex py-3 px-2 items-center">
                            <p class="text-2xl text-orange-500 font-semibold">MiPhi </p> <p class="ml-2 font-semibold italic">
                            DASHBOARD</p>
                        </div>
                    </div>

                    
                    <UserDetails />
                    
                    {/* <div class="flex justify-center">
                        <div class="">
                     
                        <img  src= {`${process.env.REACT_APP_API_URL}/${user.profile_img}`}  alt="" className="w-32 h-32 mx-auto border-4 border-orange-400 rounded-full dark:bg-gray-500 aspect-square" />

      
<p class="font-bold text-base  text-gray-400 pt-2 text-center w-24"> {user.name ? user.name.split(" ")[0] : ''} </p>
                           
                        </div>
                    </div> */}
                    <div>

                    <ul class="mt-6 leading-10">

                      {
                        props.content.map((val) => {
                         return (
                          <li class="relative px-2 py-1 ">
                                <Link class="inline-flex items-center w-full text-sm font-semibold text-white transition-colors duration-150 cursor-pointer hover:text-green-500" 
                                    to = {val[1]}>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    <span class="ml-4 uppercase">{val[0]}</span>
                                </Link>
                            </li>
                         )
                          

                           
                            
                        })
                      }
                       
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
         
        </ul>
      </div>
    </div>
  </div>
</aside>

 {/* Sidebar for mobile screens  */}
 <aside
        className={`fixed inset-y-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-gray-900 text-white transform transition ease-in-out duration-150 ${
          isMenu ? 'translate-x-0' : '-translate-x-full'
        } md:hidden`}
      >
        <div>
          <div className="flex p-2 bg-gray-800">
            <div className="flex py-3 px-2 items-center">
              <p className="text-2xl text-orange-500 font-semibold">MiPhi </p>
              <p className="ml-2 font-semibold italic">DASHBOARD</p>
            </div>
          </div>
          <div className="flex justify-center">
            <div>
              <img
                className="h-24 w-24 rounded-full object-cover mr-2 border-4 border-green-400"
                src= {`${process.env.REACT_APP_API_URL}/${user.profile_img}`}
                alt=""
              />
              <p className="font-bold text-base text-gray-400 pt-2 text-center w-24">
                <UserDetails />
              </p>
            </div>
          </div>
          <ul className="mt-6 leading-10">
            {props.content.map((val) => (
              <li className="relative px-2 py-1" key={val[1]}>
                <Link
                  className="inline-flex items-center w-full text-sm font-semibold text-white transition-colors duration-150 cursor-pointer hover:text-green-500"
                  to={val[1]}
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
                  <span className="ml-4 uppercase">{val[0]}</span>
                </Link>
              </li>
            ))}
            <li className="flex">
              <a
                className="text-white inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800"
                href="#"
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('role');
                  navigate('/login');
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4l4-4m0 0l-4-4m4 4H7m6 4v-4m0 4v-4"
                  />
                </svg>
                <span>LOGOUT</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      

        
    </div>
  )
}

export default Sidebar
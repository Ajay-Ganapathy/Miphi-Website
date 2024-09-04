import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserDetails from '../pages/Auth/UserDetails';

const Sidebar = (props) => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [isMenu , setIsMenu] = useState(false);

  const toggleSideMenu = () => setIsSideMenuOpen(!isSideMenuOpen);
  

  return (
    <div>
      {/* Button to toggle the sidebar on mobile screens */}
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

      {/* Sidebar for large screens */}
      <aside
        className={`fixed inset-y-0 z-20 flex-shrink-0 w-60 pl-2 overflow-y-auto bg-gray-800 text-white md:block ${
          isSideMenuOpen ? 'block' : 'hidden'
        }` }
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
                className="hidden h-24 w-24 rounded-full sm:block object-cover mr-2 border-4 border-green-400"
                src="/default_profile.png"
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

      {/* Sidebar for mobile screens */}
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
                src="/default_profile.png"
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
  );
};

export default Sidebar;

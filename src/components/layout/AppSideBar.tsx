import React from "react";
import {
  FaGear,
//   FaAngleDown,
  FaUserGear,
  FaShieldHalved,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
const AppSideBar = () => (
  <>
    <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800  rounded-xl">
      <ul className="space-y-2 font-medium">
        <li>
            <Link to='/config'>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <FaGear />
               <span className="ms-3">Configurations</span>
            </a>
            </Link>
         </li>
         <li>
            <Link to='user-management'>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <FaUserGear />
               <span className="ms-3">User Management</span>
            </a></Link>
         </li>
         <li>
            <Link to='security'>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <FaShieldHalved />
               <span className="ms-3">Security</span>
            </a></Link>
         </li>
        {/* <li>
          <button
            type="button"
            className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            aria-controls="dropdown-configurations"
            data-collapse-toggle="dropdown-configurations"
          >
            <FaGear />
            <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
              Configurations
            </span>
            <FaAngleDown />
          </button>
          <ul id="dropdown-configurations" className="hidden py-2 space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                Database
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                Email
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                SMS
              </a>
            </li>
          </ul>
        </li>
        <li>
          <button
            type="button"
            className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            aria-controls="dropdown-user-management"
            data-collapse-toggle="dropdown-user-management"
          >
            <FaUserGear />
            <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
              User Management
            </span>
            <FaAngleDown />
          </button>
          <ul id="dropdown-user-management" className="hidden py-2 space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                Add User
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                Delete User
              </a>
            </li>
          </ul>
        </li>
        <li>
          <button
            type="button"
            className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            aria-controls="dropdown-security"
            data-collapse-toggle="dropdown-security"
          >
            <FaShieldHalved />
            <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
              Security
            </span>
            <FaAngleDown />
          </button>
          <ul id="dropdown-security" className="hidden py-2 space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                Alert Settings
              </a>
            </li>
          </ul>
        </li> */}
      </ul>
    </div>
  </>
);

export default AppSideBar;

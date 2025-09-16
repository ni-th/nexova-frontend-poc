import React from "react";

const AppNavbar = () => {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-end mx-auto p-4">
        <a
          href="https://flowbite.com/"
          className="flex items-center float-end space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Admin Panel
          </span>
        </a>
      </div>
    </nav>
  );
};

export default AppNavbar;

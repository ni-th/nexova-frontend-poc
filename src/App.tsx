import React from "react";
import AppNavbar from "./components/layout/AppNavbar";
import AppSideBar from "./components/layout/AppSideBar";
import 'flowbite';
const App = () => {
  return <>
  <div className="dark:bg-gray-700">
    <AppNavbar/>
    <AppSideBar/>
    </div>
  </>;
};

export default App;

import React from "react";
import AppNavbar from "./components/layout/AppNavbar";
import AppSideBar from "./components/layout/AppSideBar";
import "flowbite";
import { Route, Routes } from "react-router-dom";
import ConfigManagent from "./pages/ConfigManagent";
const App = () => {
  return (
    <>
      <div className="dark:bg-gray-700 h-screen rubik">
        <AppNavbar />
        <div className="flex m-2">
          <div className="w-64 flex-none">
            <AppSideBar />
          </div>
          <div className="w-64 flex-1">
            <Routes>
              <Route path="/config" element={<ConfigManagent />}></Route>
              <Route></Route>
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

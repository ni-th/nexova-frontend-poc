import React, { useEffect } from "react";
import AppNavbar from "./components/layout/AppNavbar";
import AppSideBar from "./components/layout/AppSideBar";
import "flowbite";
import { initFlowbite } from "flowbite";
import { useLocation } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import ConfigManagent from "./pages/ConfigManagent";
import SecurityManagement from "./pages/SecurityManagement";
import UserManagement from "./pages/UserManagement";
const App = () => {
  const location = useLocation();

  useEffect(() => {
    initFlowbite();
  }, [location]);
  return (
    <>
      <div className="dark:bg-gray-700 h-screen rubik">
        <AppNavbar />
        <div className="flex m-2">
          <div className="w-64 flex-none h-full">
            <AppSideBar />
          </div>
          <div className="w-64 flex-1">
            <Routes>
              <Route path="/config" element={<ConfigManagent />}></Route>
              <Route path="/user-management" element={<UserManagement />}></Route>
              <Route path="/security" element={<SecurityManagement />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

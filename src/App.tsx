import { useEffect } from "react";
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
    useEffect(() => {
    initFlowbite();
  }, [useLocation()]);
  return (
    <>
      <AppNavbar />
      <div className="flex m-2 justify-center">
        <div className="w-64 flex-none h-full">
          <AppSideBar />
        </div>
        <div className="w-150 flex-initial  min-w-80">
          <Routes>
            <Route path="/config" element={<ConfigManagent />}></Route>
            <Route path="/user-management" element={<UserManagement />}></Route>
            <Route path="/security" element={<SecurityManagement />}></Route>
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;

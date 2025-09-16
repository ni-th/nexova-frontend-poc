import "flowbite";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
    <div className="dark:bg-gray-700 h-full">
      <App /></div>
    </BrowserRouter>
  </StrictMode>
);

import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { AuthProvider } from "./components/Functions/AuthProvider";
// import { AuthProvider } from "./components/Functions/AuthProvider";
import { LoadingProvider } from "./context/LoadingContext";


const root = document.getElementById("root");
const rootInstance = createRoot(root);

rootInstance.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LoadingProvider>
          <App />
        </LoadingProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

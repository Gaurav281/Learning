import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import "./index.css";
import SupportButton from "./components/SupportButton";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <SupportButton></SupportButton>

        {/* 🔔 GLOBAL TOAST MOUNT */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 1000,
            style: {
              background: "#0f172a",
              color: "#fff",
            },
            success: {
              style: { background: "#16a34a" },
            },
            error: {
              style: { background: "#dc2626" },
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

import { Children, useEffect, useState } from "react";
import "./App.css";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./dashboard/Dashboard";
import { Navigate, Route, Routes } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to={"/login"} />;
};

const App = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          localStorage.getItem("token") ? <Navigate to={"/"} /> : <AuthPage />
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;

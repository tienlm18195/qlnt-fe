import React from "react";
import {Routes, Route, Outlet, Link, useNavigate, useLocation, Navigate} from "react-router-dom";
import "./Root.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import {AuthProvider} from "./services/AuthProvider";
import RequireAuth from "./services/RequireAuth";

function Root() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={
          <RequireAuth>
            <Home/>
          </RequireAuth>
        }/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </AuthProvider>
  );
}

export default Root;

import React from "react";
import {
  Routes,
  Route,
  Outlet,
  Link,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
// import "./Root.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import {AuthProvider} from "./services/AuthProvider";
import RequireAuth from "./services/RequireAuth";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/*' element={
            <RequireAuth>
              <ProtectedRoutes />
            </RequireAuth>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

const ProtectedRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element = {<Home/>}/>
      <Route path="/settings" element = {<Home/>}/>
    </Routes>
  );
}

export default App;

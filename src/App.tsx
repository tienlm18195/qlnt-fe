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
import Dashboard from "./components/content/Dashboard";
import User from "./components/content/User";
import Room from "./components/content/Room";
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
      <Route path="/" element = {<Home/>}>
        <Route path="dashboard" element = {<Dashboard/>}/>
        <Route path="users" element = {<User/>}/>
        <Route path="rooms" element = {<Room/>}/>
      </Route>
    </Routes>
  );
}

export default App;

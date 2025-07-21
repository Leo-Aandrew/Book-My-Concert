// AdminRoute.jsx
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const AdminRoute = ({ children }) => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);

  if (role === null) {
    return <div>Loading...</div>; // or a spinner
  }

  return role === "admin" ? children : <Navigate to="/login" />;
};

export default AdminRoute;

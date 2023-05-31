import { useLocation, Navigate, Outlet } from "react-router-dom";
import adminContext from "./AdminContext";
import { useContext } from "react";

const RequireAdmin = () => {
  const {token} =useContext(adminContext)
  const location = useLocation();

  if (token) {
    return <Outlet/>
  } else {
    return (
      <Navigate to="/dashboard" state={{ from: location }} replace />
    );
  }
};

export default RequireAdmin;
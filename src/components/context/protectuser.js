import { useLocation, Navigate, Outlet } from "react-router-dom";
import userContext from "./userContext";
import { useContext } from "react";

const RequireUser = () => {
  const {token} =useContext(userContext)
  const location = useLocation();

  if (token) {
    return <Outlet/>
  } else {
    return (
      <Navigate to="/signIn" state={{ from: location }} replace />
    );
  }
};

export default RequireUser;
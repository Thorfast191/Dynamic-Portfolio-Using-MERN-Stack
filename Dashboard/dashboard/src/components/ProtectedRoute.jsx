import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getUser } from "@/store/slices/userSlice";

const ProtectedRoute = ({ children }) => {
  const { authHandler } = useSelector((state) => state.user);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authHandler) {
      dispatch(getUser());
    }
  }, [dispatch, authHandler]);

  if (!authHandler) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;

import { Button } from "@/components/ui/button";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearAllUserErrors, logout } from "@/store/slices/userSlice.js";
import { toast } from "react-toastify";

const HomePage = () => {
  const dispatch = useDispatch();
  const { error, message } = useSelector((state) => state.user);
  const handleLogout = () => {
    dispatch(logout());
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(clearAllUserErrors());
    }
  }, [message, dispatch, error]);
  return (
    <>
      <Button onClick={handleLogout}>LOGOUT</Button>
    </>
  );
};

export default HomePage;

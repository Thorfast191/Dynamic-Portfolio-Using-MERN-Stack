import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./store/slices/userSlice";
import { getAllMessages } from "./store/slices/messageSlice";
import { getAllSkills } from "./store/slices/skillSlice";
import { getAllSoftwareApplications } from "./store/slices/softwareApplicationSlice";
import { getAllTimeline } from "./store/slices/timelineSlice";
import { getAllProjects } from "./store/slices/projectSlice";
import HomePage from "./Pages/HomePage.jsx";
import Login from "./Pages/Login.jsx";
import ForgotPassword from "./Pages/ForgotPassword.jsx";
import ResetPassword from "./Pages/ResetPassword.jsx";
import ManageSkills from "./Pages/ManageSkills.jsx";
import ManageTimeline from "./Pages/ManageTimeline.jsx";
import ManageProjects from "./Pages/ManageProjects.jsx";
import ViewProject from "./Pages/ViewProject.jsx";
import UpdateProject from "./Pages/UpdateProject.jsx";
import AddProject from "./Pages/sub-components/AddProject";
// import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getAllSkills());
    dispatch(getAllSoftwareApplications());
    dispatch(getAllTimeline());
    dispatch(getAllMessages());
    dispatch(getAllProjects());
  }, []);

  // Test toast on app load
  useEffect(() => {
    toast.success("App loaded successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  }, []);

  return (
    <Router>
      <div className="relative">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/manage/skills" element={<ManageSkills />} />
          <Route path="/manage/timeline" element={<ManageTimeline />} />
          <Route path="/manage/projects" element={<ManageProjects />} />
          <Route path="/add-project" element={<AddProject />} />
          <Route path="/project/:id" element={<ViewProject />} />
          <Route path="/update/project/:id" element={<UpdateProject />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          style={{ zIndex: 9999 }}
        />
      </div>
    </Router>
  );
}

export default App;

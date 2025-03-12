import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./Pages/HomePage.jsx";
import Login from "./Pages/Login.jsx";
import ForgotPassword from "./Pages/ForgotPassword.jsx";
import ResetPassword from "./Pages/ResetPassword.jsx";
import ManageSkills from "./Pages/ManageSkills.jsx";
import ManageTimeline from "./Pages/ManageTimeline.jsx";
import ManageProjects from "./Pages/ManageProjects.jsx";
import ViewProject from "./Pages/ViewProject.jsx";
import UpdateProject from "./Pages/UpdateProject.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage/skills"
          element={
            <ProtectedRoute>
              <ManageSkills />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage/timeline"
          element={
            <ProtectedRoute>
              <ManageTimeline />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage/projects"
          element={
            <ProtectedRoute>
              <ManageProjects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view/project/:id"
          element={
            <ProtectedRoute>
              <ViewProject />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update/project/:id"
          element={
            <ProtectedRoute>
              <UpdateProject />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer position="bottom-right" theme="dark" />
    </Router>
  );
};

export default App;

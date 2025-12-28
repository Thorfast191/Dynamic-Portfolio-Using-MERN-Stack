import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/sub-components/Footer";
import ProjectView from "./pages/ProjectView";
import PublicationView from "./pages/PublicationView";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectView />} />
        <Route path="/publication/:id" element={<PublicationView />} />
      </Routes>
      <Footer />
      <ToastContainer position="bottom-right" theme="dark" />
    </Router>
  );
}

export default App;

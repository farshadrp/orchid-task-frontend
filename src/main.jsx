import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import App from "./App.jsx";
import AuthState from "./context/auth/AuthState.jsx";
import ProjectState from "./context/project/ProjectState.jsx";

import "react-toastify/dist/ReactToastify.css";
import "./main.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthState>
      <ProjectState>
        <App />
        <ToastContainer />
      </ProjectState>
    </AuthState>
  </BrowserRouter>
);

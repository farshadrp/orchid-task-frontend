import Home from "../pages/home";
import AddProject from "../pages/add-project";
import Login from "../pages/login";
import Project from "../pages/project";
import AddTaskForm from "../components/add-task/AddTaskForm";

export const privateRoutes = [
  { id: "1", path: "/", elememt: Home },
  { id: "2", path: "/add-project", elememt: AddProject },
  { id: "3", path: "/edit-project/:projectId", elememt: AddProject },
  { id: "4", path: "/add-task", elememt: AddTaskForm },
  { id: "5", path: "/edit-task", elememt: AddTaskForm },
  { id: "6", path: "/projects/:projectId", elememt: Project },
];

export const publicRoutes = [{ id: "1", path: "/login", elememt: Login }];

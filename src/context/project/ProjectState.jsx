import { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import ProjectContext from "./projectContext";
import ProjectReducer from "./projectReducer";
import api from "../../api";
import { GET_PROJECTS, GET_SINGLE_PROJECT } from "./types";
import { initialState } from "./initialState";

const ProjectState = (props) => {
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(ProjectReducer, initialState);

  const getProjects = async () => {
    try {
      const response = await api.get("/projects");

      if (response?.status === 200) {
        dispatch({ type: GET_PROJECTS, payload: response?.data });
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const createProject = async (data) => {
    const finalData = {
      ...data,
      id: uuidv4(),
      tasks: [],
    };

    try {
      const response = await api.post("/projects", JSON.stringify(finalData));

      if (response?.status === 201) {
        toast.success("New Project Added!");
        getProjects();
      }

      return response;
    } catch (error) {
      toast.error(error);
    }
  };

  const deleteProject = async (id) => {
    try {
      const response = await api.delete(`/projects/${id}`);

      if (response.status === 200) {
        toast.success("Project Deleted!");
        getProjects();
        navigate("/");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const editProject = async (projectId, data) => {
    try {
      const response = await api.patch(
        `/projects/${projectId}`,
        JSON.stringify(data)
      );
      return response;
    } catch (error) {
      toast.error(error);
    }
  };

  const getSingleProject = async (projectId) => {
    try {
      const response = await api.get(`/projects/${projectId}`);

      if (response?.status === 200) {
        dispatch({ type: GET_SINGLE_PROJECT, payload: response?.data });
      }
      return response;
    } catch (error) {
      toast.error(error);
    }
  };

  const addTask = async (projectId, data) => {
    const finalData = {
      ...data,
      id: uuidv4(),
    };
    const res = await getSingleProject(projectId);
    var prevData = res?.data;
    prevData.tasks?.push(finalData);
    const response = await editProject(projectId, prevData);
    return response;
  };

  const deleteTask = async (projectId, taskId) => {
    const res = await getSingleProject(projectId);
    var prevData = res?.data;
    const filtered = res?.data?.tasks?.filter((task) => {
      return task.id !== taskId;
    });
    prevData.tasks = filtered;
    const response = await editProject(projectId, prevData);
    return response;
  };

  const getSingleTask = async (projectId, taskId) => {
    try {
      const response = await api.get(`/projects/${projectId}`);

      let findSelectedTask;

      if (response?.status === 200) {
        findSelectedTask = response?.data?.tasks?.find(
          (task) => task.id === taskId
        );
      }
      return findSelectedTask;
    } catch (error) {
      toast.error(error);
    }
  };

  const editTask = async (projectId, taskId, data) => {
    const finalData = {
      ...data,
      id: uuidv4(),
    };
    const response = await getSingleProject(projectId);
    let prevData = response.data;
    let findOtherTasks = prevData?.tasks?.filter((task) => task.id !== taskId);

    findOtherTasks?.push(finalData);

    delete prevData?.tasks;

    prevData.tasks = findOtherTasks;

    const res = await editProject(projectId, prevData);

    return res;
  };

  return (
    <ProjectContext.Provider
      value={{
        ...state,
        getProjects,
        createProject,
        deleteProject,
        editProject,
        getSingleProject,
        addTask,
        deleteTask,
        getSingleTask,
        editTask,
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectState;

import { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import ProjectContext from './projectContext';
import ProjectReducer from './projectReducer';
import api from '../../api';
import { GET_PROJECTS, GET_SINGLE_PROJECT } from './types';
import { initialState } from './initialState';

const ProjectState = (props) => {
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(ProjectReducer, initialState);

  const getProjects = async () => {
    try {
      const response = await api.get('/projects');

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
      const response = await api.post('/projects', JSON.stringify(finalData));

      if (response?.status === 201) {
        toast.success('New Project Added!');
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
        toast.success('Project Deleted!');
        getProjects();
        navigate('/');
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const editProject = async (id, data) => {
    try {
      const response = await api.patch(`/projects/${id}`, JSON.stringify(data));

      if (response.status === 200) {
        toast.success('Project Updated!');
        getProjects();
        navigate('/');
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const getSingleProject = async (id) => {
    try {
      const response = await api.get(`/projects/${id}`);

      if (response?.status === 200) {
        dispatch({ type: GET_SINGLE_PROJECT, payload: response?.data });
      }
    } catch (error) {
      toast.error(error);
    }
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
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectState;

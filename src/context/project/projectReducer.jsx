import { initialState } from "./initialState";
import { GET_PROJECTS, GET_SINGLE_PROJECT } from "./types";

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECTS:
      return { ...state, projects: action.payload };

    case GET_SINGLE_PROJECT:
      return { ...state, project: action.payload };

    default:
      return state;
  }
};

export default projectReducer;

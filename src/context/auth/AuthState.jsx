import { useReducer } from "react";

import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
// import {} from './types';
import { initialState } from "./initialState";

const AuthState = (props) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // const loginUser = async (data) => {

  // };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        // loginUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;

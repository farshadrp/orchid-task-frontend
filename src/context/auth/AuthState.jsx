import { useReducer } from 'react';

import AuthContext from './authContext';
import AuthReducer from './authReducer';
// import { LOGIN_USER, LOGOUT_USER } from './types';
import { initialState } from './initialState';

const AuthState = (props) => {
  //   const token = localStorage.getItem('token');
  //   api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  //   api.interceptors.request.use(function (config) {
  //     const token = localStorage.getItem('token');
  //     config.headers.Authorization = `Bearer ${token}`;
  //     return config;
  //   });

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //   api.interceptors.response.use(
  //     function (response) {
  //       return response;
  //     },
  //     function (error) {
  //       if (401 === error.response.status) {
  //         logoutUser();
  //         window.location.href = '/';
  //       } else {
  //         return Promise.reject(error);
  //       }
  //     }
  //   );

  // logout user
  // const logoutUser = () => {
  //   dispatch({
  //     type: LOGOUT_USER,
  //   });
  //   localStorage.removeItem('token');
  //   window.location.href = '/';
  // };

  // login user
  // const loginUser = async (data) => {
  //   loadingUserstart();

  //   try {
  //     const response = await api.post(
  //       `${import.meta.env.VITE_REACT_APP_BASE_URL}/TokenAuth/Authenticate`,
  //       JSON.stringify(data)
  //     );

  //     if (response?.data?.success && response?.status === 200) {
  //       localStorage.setItem('token', response?.data?.result?.accessToken);
  //       dispatch({
  //         type: LOGIN_USER,
  //         payload: response?.data?.result?.accessToken,
  //       });
  //     } else {
  //       loadingUserFinish();
  //     }

  //     return response?.data;
  //   } finally {
  //     loadingUserFinish();
  //   }
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

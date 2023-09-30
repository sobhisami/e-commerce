import { useReducer } from 'react';
import axios from 'axios';
import { AUTH_ACTIONS } from '@/constant/auth';

const initialState = {
  users: [],
  isLoading: false,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case AUTH_ACTIONS.GET: {
      return {
        ...state,
        users: action.payload,
        isLoading: false,
      };
    }
    
    case AUTH_ACTIONS.SET_ERROR: {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    }

    default:
      return state;
  }
};

const useAPI = (url) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const getUsers = async () => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING });
    try {
      const response = await axios.get(url);
      dispatch({ type: AUTH_ACTIONS.GET, payload: response.data });
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  return {
    ...state,
    getUsers,
  };
};

export default useAPI;

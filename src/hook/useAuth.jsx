import { useReducer } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { AUTH_API_URL } from "@/config/api";
import { AUTH_ACTIONS, AUTH_API_PATHS } from "@/constant/auth";
import { PATHS } from "@/constant/path";
import { ROLES } from "@/constant";

const initialState = {
  isAuth: localStorage.getItem("isAuth") || false,
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || ROLES.GUEST,
  isLoading: false,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case AUTH_ACTIONS.AUTHORIZE:
      const token = action.payload?.token || state.token || localStorage.getItem("token");
      const role = action.payload?.isAdmin ? ROLES.ADMIN : ROLES.USER;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("isAuth", true);
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        isAuth: true,
        user: action.payload,
        token: token,
        role: role,
        isLoading: false,
        error: null,
      };

    case AUTH_ACTIONS.LOGOUT:
      ["token", "user", "role", "isAuth"].forEach((item) =>
        localStorage.removeItem(item)
      );
      return {
        isAuth: false,
        user: null,
        token: null,
        role: ROLES.GUEST,
        isLoading: false,
        error: null,
      };

    case AUTH_ACTIONS.SET_ERROR:
      return {
        error: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
};

const useAuth = () => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const token = state.token || localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const router = useRouter();

  // Constants
  const SUCCESS_ICON = "success";
  const ERROR_ICON = "error";

  // Login
  const login = async (body) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING });
    try {
      const { data } = await axios.post(AUTH_API_URL + AUTH_API_PATHS.LOGIN, body);
      dispatch({ type: AUTH_ACTIONS.AUTHORIZE, payload: data?.data || data });
      Swal.fire({
        icon: SUCCESS_ICON,
        title: 'Logged in Successfully',
        showConfirmButton: false,
        timer: 2000
      });
      router.replace(PATHS.HOME);
    } catch (error) {
      Swal.fire({
        icon: ERROR_ICON,
        title: 'Login failed: Incorrect data!',
        showConfirmButton: false,
        timer: 2000
      });
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  // Signup
  const signup = async (body) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING });
    try {
      const { data } = await axios.post(AUTH_API_URL + AUTH_API_PATHS.SIGNUP, body);
      dispatch({ type: AUTH_ACTIONS.AUTHORIZE, payload: data?.data || data });
      Swal.fire({
        icon: SUCCESS_ICON,
        title: 'Registered Successfully',
        showConfirmButton: false,
        timer: 2000
      });
      router.replace(PATHS.LOGIN);
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  // Logout
  const logout = () => {
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
    router.replace(PATHS.LOGIN);
  };
  return {
    ...state,
    login,
    signup,
    logout,
  };
};

export default useAuth;

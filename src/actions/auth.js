import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  CLEAR_MESSAGE,
} from "./types";

import * as authService from "../services/auth.service";

export const register = (username, email, password) => async (dispatch) => {
  try {
    const res = await authService.register(username, email, password);
    dispatch({
      type: REGISTER_SUCCESS,
    });

    dispatch({
      type: SET_MESSAGE,
      payload: res.data.message,
    });

    return true;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    dispatch({
      type: REGISTER_FAIL,
    });

    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });

    return false;
  }
};

export const login = (username, password) => async (dispatch) => {
  try {
    const data = await authService.login(username, password);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user: data },
    });

    dispatch({
      type: CLEAR_MESSAGE,
    });

    return true;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    dispatch({
      type: LOGIN_FAIL,
    });

    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });

    return false;
  }
};

export const logout = () => (dispatch) => {
  authService.logout();

  dispatch({
    type: LOGOUT,
  });
};

export const refreshProfile = () => async (dispatch) => {
  try {
    const data = await authService.refreshProfile();
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user: data },
    });

    return true;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    dispatch({
      type: LOGIN_FAIL,
    });

    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });

    return false;
  }
};

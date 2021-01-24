import axios from "axios";
import { FETCH_READY_DEVICE, FETCH_USED_DEVICE } from "./types";

import authHeader from "services/auth-header";
import keys from "config/keys";

export const fetchReadyDevice = () => async (dispatch) => {
  try {
    const res = await axios.get(keys.BASE_URL + "/api/device", {
      headers: authHeader(),
      params: {
        status: "ready",
      },
    });
    dispatch({ type: FETCH_READY_DEVICE, payload: res.data });
    return true;
  } catch (err) {
    return false;
  }
};

export const fetchUsedDevice = () => async (dispatch) => {
  try {
    const res = await axios.get(keys.BASE_URL + "/api/device", {
      headers: authHeader(),
      params: {
        status: "used",
      },
    });
    dispatch({ type: FETCH_USED_DEVICE, payload: res.data });
    return true;
  } catch (err) {
    return false;
  }
};

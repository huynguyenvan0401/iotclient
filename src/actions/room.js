import axios from "axios";
import { FETCH_ROOMS } from "./types";

import authHeader from "services/auth-header";
import keys from "config/keys";

export const fetchRooms = () => async (dispatch) => {
  try {
    const res = await axios.get(keys.BASE_URL + "/api/room", {
      headers: authHeader(),
    });
    dispatch({ type: FETCH_ROOMS, payload: res.data });
    return true;
  } catch (err) {
    return false;
  }
};

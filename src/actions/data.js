import axios from "axios";
import { FETCH_DATA } from "./types";

import authHeader from "services/auth-header";
import keys from "config/keys";

export const fetchData = () => async (dispatch) => {
  try {
    const res = await axios.get(keys.BASE_URL + "/api/data", {
      headers: authHeader(),
    });
    dispatch({ type: FETCH_DATA, payload: res.data });
    return true;
  } catch (err) {
    return false;
  }
};

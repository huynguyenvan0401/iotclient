import { FETCH_USED_DEVICE } from "actions/types";
const initialState = [];
export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USED_DEVICE:
      return action.payload;
    default:
      return state;
  }
}

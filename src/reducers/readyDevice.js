import { FETCH_READY_DEVICE } from "actions/types";
const initialState = [];
export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_READY_DEVICE:
      return action.payload;
    default:
      return state;
  }
}

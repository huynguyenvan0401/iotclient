import { FETCH_ROOMS } from "actions/types";
const initialState = [];
export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ROOMS:
      return action.payload;
    default:
      return state;
  }
}

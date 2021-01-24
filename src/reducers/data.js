import { FETCH_DATA } from "actions/types";
const initialState = [];
export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_DATA:
      return action.payload;
    default:
      return state;
  }
}

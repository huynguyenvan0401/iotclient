import { SET_SIDEBAR_SHOW } from "actions/types";

const initialState = {
  sidebarShow: "responsive",
};

const changeState = (state = initialState, action) => {
  switch (action.type) {
    case SET_SIDEBAR_SHOW:
      return action.sidebarShow;
    default:
      if (state.sidebarShow) {
        return state.sidebarShow;
      } else {
        return "responsive";
      }
  }
};

export default changeState;

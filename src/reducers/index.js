import { combineReducers } from "redux";

import sidebarShow from "./sidebarShow";

//auth
import auth from "./auth";
import message from "./message";
//room
import rooms from "./rooms";

import readyDevice from "./readyDevice";
import usedDevice from "./usedDevice";
import data from "./data";
export default combineReducers({
  auth,
  message,
  sidebarShow,
  rooms,
  readyDevice,
  usedDevice,
  data,
});

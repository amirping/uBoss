import { combineReducers } from "redux";
import view from "./view";
import net from "./net";
import auth from "./auth";
import dashboards from "./dashboards";

const rootReducer = combineReducers({
  // short hand property names
  view,
  net,
  auth,
  dashboards
});
export default rootReducer;

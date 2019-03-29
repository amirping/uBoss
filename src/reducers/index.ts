import { combineReducers } from "redux";
import view from "./view";
import net from "./net";
import auth from "./auth";
// const initialState = {
//   dashboardsList: {
//     dashboardsIDs: [],
//     dashboards: {}
//   },
//   sideMenu: true,
//   connected: false,
//   user: null,
//   dashboardTocreate: {
//     id: "",
//     title: "",
//     lists: []
//   },
//   selectedDashboardID: null,
//   selectedDashboardData: null,
//   success: null,
//   error: null
// };

const rootReducer = combineReducers({
  // short hand property names
  view,
  net,
  auth
});
export default rootReducer;

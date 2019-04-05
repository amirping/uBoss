import * as Types from "../actions/actionTypes";
import intialState from "./intialState";
let dashboardsState = {};
Object.assign(
  dashboardsState,
  intialState.auth,
  intialState.system,
  intialState.dashboardTocreate,
  intialState.dashboardsList,
  intialState.loadedDashboard
);
export default function dashboards(state: any = dashboardsState, action: any) {
  if (action.type === Types.LOAD_DASHBOARDS_SUCCESS) {
    console.log("fiirrreee");
    let dashboardsIDS: any = [];
    let dashslist: any = {};
    action.payload.map((dash: any) => {
      dashboardsIDS.push(dash._id);
      dashslist[dash._id] = dash;
    });
    return Object.assign({}, state, {
      dashboardsIDs: dashboardsIDS,
      dashboards: dashslist
    });
  }
  if (action.type === Types.LOAD_DASHBOARD_SUCCESS) {
    console.log("fiirrreee one");
    return Object.assign({}, state, {
      selectedDashboardData: action.payload
    });
  }
  if (action.type === Types.LOAD_DASHBOARD_ERROR) {
    console.log("fiirrreee one");
    return Object.assign({}, state, {
      success: null,
      error: { id: "DASHBOARD", dettails: action.error }
    });
  }
  if (action.type === Types.LOAD_DASHBOARDS_ERROR) {
    return Object.assign({}, state, {
      success: null,
      error: { id: "DASHBOARDS", dettails: action.error }
    });
  }
  if (action.type === Types.DASHBOARD_CREATOR_ADD_LIST) {
    return Object.assign({}, state, {
      lists: state.lists.concat(action.payload)
    });
  }
  if (action.type === Types.DASHBOARD_CREATOR_REMOVE_LIST) {
    let arr = state.lists;
    arr.splice(state.lists.indexOf(action.payload), 1);
    return Object.assign({}, state, {
      lists: arr
    });
  }
  if (action.type === Types.CREATE_DASHBOARD_SUCCESS) {
    let dashs = state.dashboards;
    dashs[action.payload._id] = action.payload;
    return Object.assign({}, state, {
      lists: [],
      error: null,
      dashboardsIDs: state.dashboardsIDs.concat(action.payload._id),
      dashboards: dashs,
      success: {
        id: "DASHBOARDS",
        message: "Your Dashboard Have been created"
      }
    });
  }
  if (action.type === Types.SELECT_DASHBOARD) {
    console.log("select", action.payload);
    return Object.assign({}, state, {
      selectedDashboardID: action.payload,
      selectedDashboardData: null
    });
  }
  return state;
}

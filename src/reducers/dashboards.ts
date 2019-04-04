// still off
import * as Types from "../actions/actionTypes";
import intialState from "./intialState";
let dashboardsState = {};
Object.assign(
  dashboardsState,
  intialState.auth,
  intialState.system,
  intialState.dashboardTocreate,
  intialState.dashboardsList
);
export default function dashboards(state = dashboardsState, action: any) {
  if (action.type === Types.LOAD_DASHBOARDS_SUCCESS) {
    console.log("fiirrreee");

    let dashboardsIDS: any = [];
    let dashslist: any = {};
    action.payload.map((dash: any) => {
      dashboardsIDS.push(dash._id);
      dashslist[dash._id] = dash;
    });
    console.log(dashboardsIDS);
    console.log(dashslist);

    return Object.assign({}, state, {
      //   success: { id: "SIGNUP" }
      dashboardsIDs: dashboardsIDS,
      dashboards: dashslist
    });
  }
  if (action.type === Types.LOAD_DASHBOARDS_ERROR) {
    return Object.assign({}, state, {
      success: null,
      error: { id: "DASHBOARDS", dettails: action.error }
    });
  }
  return state;
}

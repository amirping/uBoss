import * as Types from "../actions/actionTypes";
const initialState = {
  dashboardsList: {
    dashboardsIDs: [],
    dashboards: {}
  },
  sideMenu: true,
  connected: false,
  user: null,
  dashboardTocreate: {
    id: "",
    title: "",
    lists: []
  },
  selectedDashboardID: null,
  selectedDashboardData: null
};
function rootReducer(state = initialState, action: any) {
  if (action.type === Types.TOGGLE_SIDE) {
    return Object.assign({}, state, {
      sideMenu: !state.sideMenu
    });
  }
  return state;
}
export default rootReducer;

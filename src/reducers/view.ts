import * as Types from "../actions/actionTypes";
import initialState from "./intialState";

export default function auth(state = initialState.view, action: any) {
  if (action.type === Types.TOGGLE_SIDE) {
    return Object.assign({}, state, {
      sideMenu: !state.sideMenu
    });
  }
  if (action.type === Types.PROFILE_MANAGEMENT_OPEN) {
    return Object.assign({}, state, {
      profileManagement: true
    });
  }
  if (action.type === Types.PROFILE_MANAGEMENT_CLOSE) {
    return Object.assign({}, state, {
      profileManagement: false
    });
  }
  if (action.type === Types.DASHBOARD_CREATOR_CLOSE) {
    return Object.assign({}, state, {
      dashboardCreator: false
    });
  }
  if (action.type === Types.DASHBOARD_CREATOR_OPEN) {
    return Object.assign({}, state, {
      dashboardCreator: true
    });
  }
  if (action.type === Types.DASHBOARD_CONFIG_CLOSE) {
    return Object.assign({}, state, {
      dashboardConfig: false
    });
  }
  if (action.type === Types.DASHBOARD_CONFIG_OPEN) {
    return Object.assign({}, state, {
      dashboardConfig: true
    });
  }
  if (action.type === Types.CARD_DATA_OPEN) {
    return Object.assign({}, state, {
      cardData: true
    });
  }
  if (action.type === Types.CARD_DATA_CLOSE) {
    return Object.assign({}, state, {
      cardData: false
    });
  }
  return state;
}

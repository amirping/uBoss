import * as Types from "../actions/actionTypes";
import initialState from "./intialState";

export default function auth(state = initialState.view, action: any) {
  if (action.type === Types.TOGGLE_SIDE) {
    return Object.assign({}, state, {
      sideMenu: !state.sideMenu
    });
  }
  return state;
}

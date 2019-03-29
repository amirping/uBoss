import * as Types from "../actions/actionTypes";
import intialState from "./intialState";
let authState = {};
Object.assign(authState, intialState.auth, intialState.system);
export default function auth(state = authState, action: any) {
  if (action.type === Types.LOGIN) {
    return Object.assign({}, state, {});
  }
  if (action.type === Types.SIGNUP_SUCCESS) {
    return Object.assign({}, state, {
      success: { id: "SIGNUP" }
    });
  }
  if (action.type === Types.SIGNUP_ERROR) {
    return Object.assign({}, state, {
      success: null,
      error: { id: "SIGNUP", dettails: action.error }
    });
  }
  return state;
}

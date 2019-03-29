/**
 * this reducer will handle the session and profile actions , there is no need to have a separet reducer for user
 */
import * as Types from "../actions/actionTypes";
import intialState from "./intialState";
let authState = {};
Object.assign(authState, intialState.auth, intialState.system);
export default function auth(state = authState, action: any) {
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
  if (action.type === Types.LOGIN_SUCCESS) {
    return Object.assign({}, state, {
      success: { id: "LOGIN" },
      connected: !!localStorage.getItem("token")
    });
  }
  if (action.type === Types.LOGIN_ERROR) {
    return Object.assign({}, state, {
      success: null,
      error: { id: "LOGIN", dettails: action.error }
    });
  }
  if (action.type === Types.LOAD_USER_SUCCESS) {
    return Object.assign({}, state, {
      user: JSON.parse(localStorage.getItem("user") || "")
    });
  }

  return state;
}
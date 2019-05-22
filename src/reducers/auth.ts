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
      connected: !!localStorage.getItem("token"),
      user: JSON.parse(localStorage.getItem("user") || "null")
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
      user: JSON.parse(localStorage.getItem("user") || "null")
    });
  }
  if (action.type === Types.LOAD_USER_ERROR) {
    return Object.assign({}, state, {
      success: null,
      error: { id: "LOAD_USER", dettails: action.error },
      user: JSON.parse(localStorage.getItem("user") || "null")
    });
  }
  if (action.type === Types.UPDATE_USER_SUCCESS) {
    return Object.assign({}, state, {
      success: { id: "UPDATE_USER" },
      error: null,
      user: JSON.parse(localStorage.getItem("user") || "null")
    });
  }
  if (action.type === Types.LOGOUT_SUCCESS) {
    return Object.assign({}, state, {
      success: { id: "LOGOUT_USER" },
      error: null,
      user: null,
      connected: false
    });
  }
  if (action.type === Types.LOGOUT_ERROR) {
    return Object.assign({}, state, {
      success: null,
      error: { id: "LOGOUT_USER", dettails: action.error },
      user: null,
      connected: false
    });
  }
  if (action.type === Types.UPDATE_USER_ERROR) {
    return Object.assign({}, state, {
      success: null,
      error: { id: "UPDATE_USER", dettails: action.error },
      user: JSON.parse(localStorage.getItem("user") || "null")
    });
  }
  if (action.type === Types.APPROVE_ACCOUNT) {
    return Object.assign({}, state, {
      approvingAction: JSON.parse(
        localStorage.getItem("approvingAction") || "null"
      )
    });
  }
  if (action.type === Types.APPROVE_ACCOUNT_END) {
    return Object.assign({}, state, {
      endApprovingAction: JSON.parse(
        localStorage.getItem("endApprovingAction") || "null"
      )
    });
  }

  if (action.type === Types.APPROVE_ACCOUNT_SUCCESS) {
    return Object.assign({}, state, {
      //approvingAction: false,
      success: { id: "APPROVE" },
      error: null,
      user: JSON.parse(localStorage.getItem("user") || "null"),
      endApprovingAction: JSON.parse(
        localStorage.getItem("endApprovingAction") || "null"
      )
    });
  }
  if (action.type === Types.APPROVE_ACTION_RESET) {
    return Object.assign({}, state, {
      approvingAction: JSON.parse(
        localStorage.getItem("approvingAction") || "null"
      ),
      endApprovingAction: JSON.parse(
        localStorage.getItem("endApprovingAction") || "null"
      )
    });
  }
  if (action.type === Types.APPROVE_ACCOUNT_ERROR) {
    return Object.assign({}, state, {
      //approvingAction: false,
      error: { id: "APPROVE", dettails: action.error },
      success: null,
      endApprovingAction: JSON.parse(
        localStorage.getItem("endApprovingAction") || "null"
      )
    });
  }
  return state;
}

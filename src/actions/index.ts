// will removed ya m3alem
import * as Types from "./actionTypes";
export function createDashboard(payload: any) {
  return { type: Types.CREATE_DASHBOARD, payload };
}
export function login(payload: any) {
  // start the api work here
  return { type: Types.LOGIN, payload };
}
export function loginSuccess(payload: any) {
  return { type: Types.LOGIN_SUCCESS, payload };
}

export const signup = (payload: any, history: any) => (dispatch: any) => {
  return { type: Types.SIGNUP, payload };
};
export function logout(payload: any) {
  return { type: Types.LOGOUT, payload };
}
export function logoutSuccess(payload: any) {
  return { type: Types.LOGOUT_SUCCESS, payload };
}
export function selectDashboard(payload: any) {
  return { type: Types.SELECT_DASHBOARD, payload };
}
// export function importDashboard(payload: any) {
//   return { type: Types.IMPORT_DASHBOARD, payload };
// }
export function importList(payload: any) {
  return { type: Types.IMPORT_LIST, payload };
}
export function toggleSide() {
  return { type: Types.TOGGLE_SIDE };
}

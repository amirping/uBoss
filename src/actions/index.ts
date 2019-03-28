import * as Types from "./actionTypes";
export function createDashboard(payload: any) {
  return { type: Types.CREATE_DASHBOARD, payload };
}
export function login(payload: any) {
  return { type: Types.LOGIN, payload };
}
export function signup(payload: any) {
  return { type: Types.SIGNUP, payload };
}
export function logout(payload: any) {
  return { type: Types.LOGOUT, payload };
}
export function selectDashboard(payload: any) {
  return { type: Types.SELECT_DASHBOARD, payload };
}
export function importDashboard(payload: any) {
  return { type: Types.IMPORT_DASHBOARD, payload };
}
export function importList(payload: any) {
  return { type: Types.IMPORT_LIST, payload };
}
export function toggleSide() {
  return { type: Types.TOGGLE_SIDE };
}

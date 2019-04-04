import * as Types from "./actionTypes";
export function toggleSide() {
  return { type: Types.TOGGLE_SIDE };
}
export function openProfileManagement() {
  return { type: Types.PROFILE_MANAGEMENT_OPEN };
}
export function closeProfileManagement() {
  return { type: Types.PROFILE_MANAGEMENT_CLOSE };
}
export function openDashboardCreator() {
  return { type: Types.DASHBOARD_CREATOR_OPEN };
}
export function closeDashboardCreator() {
  return { type: Types.DASHBOARD_CREATOR_CLOSE };
}

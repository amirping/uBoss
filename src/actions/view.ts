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
export function openDashboardConfig() {
  return { type: Types.DASHBOARD_CONFIG_OPEN };
}
export function closeDashboardConfig() {
  return { type: Types.DASHBOARD_CONFIG_CLOSE };
}
export function closeCardData() {
  return { type: Types.CARD_DATA_CLOSE };
}
export function openCardData() {
  return { type: Types.CARD_DATA_OPEN };
}

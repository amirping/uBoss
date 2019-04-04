import * as Types from "./actionTypes";
import dashboardApi from "../api/dashboardApi";
import { netError } from "./net";
import { func } from "prop-types";
export function loadDashboard(dashboard: any, user: any) {
  console.log("Fire action -> loadDashboard");
  return function(dispatch: any) {
    return dashboardApi
      .getDashboard(user, dashboard._id)
      .then(response => {
        if (response.status === 200) {
          let ndash = response.data;

          dispatch(loadDashboardSuccess(ndash));
        } else if (response.status === 404) {
          dispatch(
            loadDashboardError({ code: 404, message: "ressource not found" })
          );
        } else {
          dispatch(
            loadDashboardError({
              code: response.status,
              message: "We have problems"
            })
          );
        }
      })
      .catch(error => {
        dispatch(netError(error));
        throw error;
      });
  };
}
export function loadDashboards(token: string) {
  console.log("Fire action -> loadDashboards");
  return function(dispatch: any) {
    return dashboardApi
      .getDashboards(token)
      .then(response => {
        if (response.status === 200) {
          let ndash = response.data;
          dispatch(loadDashboardsSuccess(ndash));
        } else if (response.status === 404) {
          dispatch(
            loadDashboardsError({ code: 404, message: "ressource not found" })
          );
        } else {
          dispatch(
            loadDashboardsError({
              code: response.status,
              message: "We have problems"
            })
          );
        }
      })
      .catch(error => {
        dispatch(netError(error));
        throw error;
      });
  };
}
export function loadDashboardSuccess(data: any) {
  return { type: Types.LOAD_DASHBOARD_SUCCESS, payload: data };
}
export function loadDashboardsSuccess(data: any) {
  return { type: Types.LOAD_DASHBOARDS_SUCCESS, payload: data };
}
export function loadDashboardError(error: any) {
  return { type: Types.LOAD_DASHBOARD_ERROR, error: error };
}
export function loadDashboardsError(error: any) {
  return { type: Types.LOAD_DASHBOARDS_ERROR, error: error };
}
export function updateDashboard(dashboard: any, user: any) {
  console.log("Fire action -> updateDashboard");
  return function(dispatch: any) {
    return dashboardApi
      .updateDashboard(dashboard, user)
      .then(response => {
        if (response.status === 202) {
          let ndash = response.data;
          dispatch(updateDashboardSuccess());
        } else if (response.status === 404) {
          dispatch(
            updateDashboardError({ code: 404, message: "ressource not found" })
          );
        } else if (response.status === 422) {
          dispatch(
            updateDashboardError({ code: 422, message: "Validation failed" })
          );
        } else if (response.status === 403) {
          dispatch(
            updateDashboardError({ code: 403, message: "Access denied" })
          );
        } else if (response.status === 401) {
          localStorage.clear();
          dispatch(
            updateDashboardError({
              code: 403,
              message: "JWT token invalid or did not provided"
            })
          );
        } else {
          dispatch(
            updateDashboardError({
              code: response.status,
              message: "We have problems"
            })
          );
        }
      })
      .catch(error => {
        dispatch(netError(error));
        throw error;
      });
  };
}
export function updateDashboardSuccess() {
  return { type: Types.UPDATE_DASHBOARD_SUCCESS };
}
export function updateDashboardError(error: any) {
  return { type: Types.UPDATE_DASHBOARD_ERROR, error: error };
}

import * as Types from "./actionTypes";
import dashboardApi from "../api/dashboardApi";
import { netError } from "./net";
import { closeDashboardCreator } from "./view";
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
export function addListToDashboardCreator(data: any) {
  return { type: Types.DASHBOARD_CREATOR_ADD_LIST, payload: data };
}
export function removeListToDashboardCreator(data: any) {
  return { type: Types.DASHBOARD_CREATOR_REMOVE_LIST, payload: data };
}
export function createDashboard(dashboard: any, token: string) {
  console.log("Fire action -> createDashboard");
  return function(dispatch: any) {
    return dashboardApi
      .createDashboard(dashboard, token)
      .then(response => {
        if (response.status === 201) {
          let ndash = response.data;
          dispatch(createDashboardSuccess(ndash));
          dispatch(closeDashboardCreator());
        } else {
          dispatch(
            createDashboardError({
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
export function createDashboardSuccess(dashboard: any) {
  return { type: Types.CREATE_DASHBOARD_SUCCESS, payload: dashboard };
}
export function createDashboardError(error: any) {
  return { type: Types.CREATE_DASHBOARD_ERROR, error: error };
}
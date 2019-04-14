import * as Types from "./actionTypes";
import { netError } from "./net";
import { closeDashboardCreator } from "./view";
import ImportedDashboardApi from "../api/importedDashboardApi";
import { types } from "util";
import { loadDashboard } from "./dashboards";
import trelloApi from "../api/trelloApi";
export function createImportedDashboard(
  dashboardID: string,
  token: string,
  importedDashboard: any
) {
  return function(dispatch: any) {
    console.log("Fire action -> createImportedDashboard");
    return ImportedDashboardApi.createImportedDashboard(
      token,
      dashboardID,
      importedDashboard
    )
      .then(response => {
        if (response.status === 201) {
          dispatch(createImportedDashboardSuccess());
          dispatch(loadDashboard(dashboardID, token));
        } else {
          dispatch(
            createImportedDashboardError({
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
export function deleteImportedDashboard(
  importedDashboardID: string,
  token: string,
  dashboardID: string
) {
  return function(dispatch: any) {
    return ImportedDashboardApi.deteleImportedDashboard(
      token,
      importedDashboardID
    )
      .then(response => {
        if (response.status === 202) {
          dispatch(deleteImportedDashboardSuccess());
          dispatch(loadDashboard(dashboardID, token));
        } else {
          dispatch(
            deleteImportedDashboardError({
              code: response.status,
              message: response.message
            })
          );
        }
      })
      .catch(error => {
        dispatch(netError(error));
      });
  };
}

export function createImportedDashboardSuccess() {
  return { type: Types.CREATE_IMPORTED_DASHBOARD_SUCCESS };
}
export function createImportedDashboardError(payload: any) {
  return { type: Types.CREATE_IMPORTED_DASHBOARD_ERROR, error: payload };
}
export function deleteImportedDashboardSuccess() {
  return { type: Types.DELETE_IMPORTED_DASHBOARD_SUCCESS };
}
export function deleteImportedDashboardError(payload: any) {
  return { type: Types.DELETE_IMPORTED_DASHBOARD_ERROR, error: payload };
}

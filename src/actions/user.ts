import * as Types from "./actionTypes";
import userApi from "../api/userApi";
import { netError } from "./net";
export function loadUser(user: any) {
  console.log("Fire action -> loadUser");
  return function(dispatch: any) {
    return userApi
      .getUser(user)
      .then(response => {
        if (response.status === 200) {
          let nuser = response.data;
          localStorage.setItem("user", JSON.stringify(nuser));
          dispatch(loadUserSuccess());
        } else if (response.status === 404) {
          localStorage.clear();
          dispatch(
            loadUserError({ code: 404, message: "ressource not found" })
          );
        } else {
          dispatch(
            loadUserError({
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
export function loadUserSuccess() {
  return { type: Types.LOAD_USER_SUCCESS };
}
export function loadUserError(error: any) {
  return { type: Types.LOAD_USER_ERROR, error: error };
}
export function updateUser(user: any, token: string) {
  console.log("Fire action -> updateUser");
  return function(dispatch: any) {
    return userApi
      .updateUser(user, token)
      .then(response => {
        if (response.status === 202) {
          let nuser = response.data;
          localStorage.setItem("user", JSON.stringify(nuser));
          dispatch(updateUserSuccess());
        } else if (response.status === 404) {
          localStorage.clear();
          dispatch(
            updateUserError({ code: 404, message: "ressource not found" })
          );
        } else if (response.status === 422) {
          dispatch(
            updateUserError({ code: 422, message: "Validation failed" })
          );
        } else if (response.status === 403) {
          dispatch(updateUserError({ code: 403, message: "Access denied" }));
        } else if (response.status === 401) {
          localStorage.clear();
          dispatch(
            updateUserError({
              code: 403,
              message: "JWT token invalid or did not provided"
            })
          );
        } else {
          dispatch(
            updateUserError({
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
export function updatePassword(user: any) {
  console.log("fire -> updatePassword");
  return function(dispatch: any) {
    return userApi
      .updatePassword(user)
      .then(response => {
        if (response.status === 200) {
          dispatch(updateUserSuccess());
        } else if (response.status === 422) {
          dispatch(
            updateUserError({ code: 422, message: "Validation failed" })
          );
        } else if (response.status === 401) {
          localStorage.clear();
          dispatch(
            updateUserError({
              code: 403,
              message: "JWT token invalid or did not provided"
            })
          );
        } else {
          dispatch(
            updateUserError({
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
export function updateUserSuccess() {
  return { type: Types.UPDATE_USER_SUCCESS };
}
export function updateUserError(error: any) {
  return { type: Types.UPDATE_USER_ERROR, error: error };
}
export function startApproveAccount() {
  localStorage.setItem("approvingAction", "true");
  return { type: Types.APPROVE_ACCOUNT };
}
export function endApproveAccount() {
  localStorage.removeItem("approvingAction");
  return { type: Types.APPROVE_ACCOUNT_END };
}
export function approveAccount(user: any, token: string) {
  console.log("start approve now");
  return function(dispatch: any) {
    return userApi
      .updateUser(user, token)
      .then(response => {
        if (response.status === 202) {
          let nuser = response.data;
          localStorage.setItem("user", JSON.stringify(nuser));
          dispatch(approveAccountSucces());
        } else if (response.status === 404) {
          localStorage.clear();
          dispatch(
            approveAccountError({ code: 404, message: "ressource not found" })
          );
        } else if (response.status === 422) {
          dispatch(
            approveAccountError({ code: 422, message: "Validation failed" })
          );
        } else if (response.status === 403) {
          dispatch(updateUserError({ code: 403, message: "Access denied" }));
        } else if (response.status === 401) {
          localStorage.clear();
          dispatch(
            approveAccountError({
              code: 403,
              message: "JWT token invalid or did not provided"
            })
          );
        } else {
          dispatch(
            approveAccountError({
              code: response.status,
              message: "We have problems"
            })
          );
        }
      })
      .catch(error => {
        console.log(error);
        dispatch(netError(error));
        throw error;
      });
  };
}
export function approveAccountSucces() {
  return { type: Types.APPROVE_ACCOUNT_SUCCESS };
}

export function approveAccountError(error: any) {
  return { type: Types.APPROVE_ACCOUNT_ERROR, error: error };
}

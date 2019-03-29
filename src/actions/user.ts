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
  return { type: Types.LOAD_USER_ERROR };
}
export function updateUser() {
  return { type: Types.UPDATE_USER };
}
export function updateUserSuccess() {
  return { type: Types.UPDATE_USER_SUCCESS };
}
export function updateUserError() {
  return { type: Types.UPDATE_USER_SUCCESS };
}

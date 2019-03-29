import * as Types from "./actionTypes";
import authApi from "../api/authApi";
import { netError } from "./net";
export function loginSuccess(payload: any) {
  return { type: Types.LOGIN_SUCCESS, payload };
}

export function signupSuccess() {
  return { type: Types.SIGNUP_SUCCESS };
}
export function signupError(error: any) {
  return { type: Types.SIGNUP_ERROR, error };
}

export function login(payload: any) {
  return { type: Types.LOGIN, payload };
}

export const signup = (user: any) => {
  console.log("fired action SIGNUP");

  return function(dispatch: any) {
    return authApi
      .signup(user)
      .then(response => {
        console.log(response);
        if (response.status === 201) {
          dispatch(signupSuccess());
        } else if (response.status === 422) {
          dispatch(signupError({ code: 422, message: "Validation failed" }));
        } else {
          dispatch(
            signupError({
              code: response.status,
              message: "Problem in our servers"
            })
          );
        }
      })
      .catch(error => {
        dispatch(netError(error));
        throw error;
      });
  };
};
export function logout(payload: any) {
  return { type: Types.LOGOUT, payload };
}
export function logoutSuccess(payload: any) {
  return { type: Types.LOGOUT_SUCCESS, payload };
}

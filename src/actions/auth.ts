import * as Types from "./actionTypes";
import authApi from "../api/authApi";
import { netError } from "./net";

export function loginSuccess() {
  return { type: Types.LOGIN_SUCCESS };
}
export function loginError(error: any) {
  return { type: Types.LOGIN_ERROR, error };
}

export function signupSuccess() {
  return { type: Types.SIGNUP_SUCCESS };
}
export function signupError(error: any) {
  return { type: Types.SIGNUP_ERROR, error };
}

export function login(payload: any) {
  console.log("fired action LOGIN");
  return function(dispatch: any) {
    return authApi
      .login(payload)
      .then(response => {
        if (response.status === 200) {
          let data = response.data;
          localStorage.setItem("token", data.token);
          localStorage.setItem("refreshToken", data.refreshToken);
          data.user["password"] = null;
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch(loginSuccess());
        } else if (response.status === 401) {
          dispatch(
            loginError({
              code: 401,
              message: "Wrong email or password"
            })
          );
        } else if (response.status === 422) {
          dispatch(
            loginError({
              code: 422,
              message: "JWT token invalid or did not provided"
            })
          );
        } else {
          dispatch(
            loginError({
              code: response.status,
              message: "Problem with our servers"
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

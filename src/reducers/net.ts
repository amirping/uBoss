// still off
import * as Types from "../actions/actionTypes";
import initialState from "./intialState";

export default function auth(state = initialState, action: any) {
  if (action.type === Types.NET_ERROR) {
  }
  return state;
}

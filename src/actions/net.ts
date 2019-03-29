import * as Types from "./actionTypes";
export function netError(payload: any) {
  return { type: Types.NET_ERROR, payload };
}

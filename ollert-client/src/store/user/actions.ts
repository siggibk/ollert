import { AuthActionTypes, SET_USER, User } from "./types";

export function setUser(payload: User) : AuthActionTypes {
  return {
    type: SET_USER,
    payload: payload
  }
}
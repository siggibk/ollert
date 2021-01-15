import { AuthActionTypes, LOGIN, Login, SET_USER, User } from "./types";

// Typescript infers that this is returning LoginAction (Part of AuthActionTypes)
export function Login(payload: Login): AuthActionTypes {
  return {
    type: LOGIN,
    payload: payload
  }
}

export function SetUser(payload: User) : AuthActionTypes {
  return {
    type: SET_USER,
    payload: payload
  }
}
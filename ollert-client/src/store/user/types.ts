export const LOGIN = 'LOGIN'
export const SET_USER = 'SET_USER'

export interface User {
  id: string,
  email: string
}

export interface Login {
  email: string,
  password: string
}

export interface UserState {
  loggedIn: boolean,
  user: User | null
}

interface LoginAction {
  type: typeof LOGIN,
  payload: Login
}

interface SetUserAction {
  type: typeof SET_USER,
  payload: User
}

export type AuthActionTypes = LoginAction | SetUserAction
// LoginAction | RegisterAction
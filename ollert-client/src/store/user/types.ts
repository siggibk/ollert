export const SET_USER = 'SET_USER'

export interface UserState {
  loggedIn: boolean,
  user: User | null
}

export interface User {
  id: string,
  email: string
}

export interface Login {
  email: string,
  password: string
}

export interface Register {
  email: string,
  password: string
}

interface SetUserAction {
  type: typeof SET_USER,
  payload: User
}

export type AuthActionTypes = SetUserAction
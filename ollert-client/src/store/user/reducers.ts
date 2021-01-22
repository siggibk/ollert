import { UserState, AuthActionTypes, SET_USER } from './types'

const initialState: UserState = {
  loggedIn: false,
  user: null
}

export function userReducer(state = initialState, action: AuthActionTypes) : UserState {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        loggedIn: true
      }
    default:
      return state
  }
}
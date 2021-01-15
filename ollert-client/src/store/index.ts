import { combineReducers } from 'redux'
import { boardReducer } from './board/reducers'
import { userReducer } from './user/reducers'

export const rootReducer = combineReducers({
  user: userReducer,
  board: boardReducer
})

export type RootState = ReturnType<typeof rootReducer>
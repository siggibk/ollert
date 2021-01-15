import { convertTypeAcquisitionFromJson } from "typescript";
import { BoardState, BoardActionTypes, ADD_TASK, ADD_COLUMN, SET_CURRENT_BOARD } from "./types";

const initialState: BoardState = {
  boards: [],
  currentBoard: null,
  // test
  tasks: []
}

export function boardReducer(state = initialState, action: BoardActionTypes): BoardState {
  switch (action.type) {
    case SET_CURRENT_BOARD:
      return {
        ...state,
        currentBoard: action.payload
      }
    case ADD_TASK:
      // fix
      // currentBoard.columns.find() -> c.tasks.push(..)
      console.log('In add task')
      console.log(action.type)
      console.log(action.payload)
      return {
        ...state,
        tasks: state.tasks.concat([action.payload])
      }
    case ADD_COLUMN:
      // fix
      // push payload to currentBoard.columns
      return state
    default:
      return state
  }
}
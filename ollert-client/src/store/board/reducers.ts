import { BoardState, BoardActionTypes, ADD_TASK, ADD_COLUMN, SET_CURRENT_BOARD, ADD_BOARDS } from "./types";

const initialState: BoardState = {
  boards: [],
  currentBoard: null,
  // test
  tasks: []
}

export function boardReducer(state = initialState, action: BoardActionTypes): BoardState {
  switch (action.type) {
    case ADD_BOARDS:
      return {
        ...state,
        boards: action.payload
      }
    case SET_CURRENT_BOARD:
      console.log('set current board')
      console.log(action.payload)
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
      const index = 0
      return {
        ...state,
        currentBoard: {
          ...state.currentBoard,
          columns: {
            ...state.currentBoard?.columns,
            [index]: {
              tasks: [
                ...state.currentBoard?.columns?[index].tasks,
                action.payload
              ]
            }
          }
        }
      }
    case ADD_COLUMN:
      // fix
      // push payload to currentBoard.columns
      return state
    default:
      return state
  }
}
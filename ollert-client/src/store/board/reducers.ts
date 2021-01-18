import { BoardState, BoardActionTypes, ADD_TASK, ADD_COLUMN, SET_CURRENT_BOARD, ADD_BOARDS, ADD_BOARD, UPDATE_COLUMN } from "./types";

const initialState: BoardState = {
  boards: [],
  currentBoard: null
}

export function boardReducer(state = initialState, action: BoardActionTypes): BoardState {
  switch (action.type) {
    case ADD_BOARDS:
      return {
        ...state,
        boards: action.payload
      }
    case ADD_BOARD:
      /* return {
        ...state,
        boards: [...state.boards, action.payload]
      } */
      return state
    case SET_CURRENT_BOARD:
      console.log('set current board')
      console.log(action.payload)
      return {
        ...state,
        currentBoard: action.payload
      }
    case ADD_TASK:
      if (!state.currentBoard) {
        throw new Error("Current board is null, cannot add task: reducers.ts");
      }

      return {
        ...state,
        currentBoard: {
          ...state.currentBoard,
          columns: 
            state.currentBoard.columns.map((col) => {
              if (col.id === action.payload.columnId) {
                return {
                  ...col,
                  tasks: col.tasks.concat(action.payload)
                }
              }
              return col
            })
        }
      }
    case ADD_COLUMN:
      return {
        ...state,
        currentBoard: {
          ...state.currentBoard!,
          columns: [
            ...state.currentBoard!.columns,
            action.payload
          ]
        }
      }
    case UPDATE_COLUMN:
      return {
        ...state,
        currentBoard: {
          ...state.currentBoard!,
          columns:
            state.currentBoard!.columns.map((col) => {
              if (col.id === action.payload.id) {
                return {
                  ...col,
                  ...action.payload
                }
              }
              return col
            })
        }
      }
    default:
      return state
  }
}
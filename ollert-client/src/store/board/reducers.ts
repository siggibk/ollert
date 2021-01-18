import taskRepository from "../../api/taskRepository";
import { setCurrentBoard } from "./actions";
import { BoardState, BoardActionTypes, ADD_TASK, ADD_COLUMN, SET_CURRENT_BOARD, ADD_BOARDS, ADD_BOARD, UPDATE_COLUMN, Task, UPDATE_TASK } from "./types";

// TODO make state flatter
// some duplicates going on inside currentBoard
const initialState: BoardState = {
  boards: [],
  currentBoard: null,
  tasks: []
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
      const columns = action.payload.columns
      const empty: Task[] = []
      const merged_tasks: Task[] = empty.concat(...columns.map((col) => col.tasks))

      return {
        ...state,
        currentBoard: action.payload,
        tasks: merged_tasks
      }
    case ADD_TASK:
      if (!state.currentBoard) {
        throw new Error("Current board is null, cannot add task: reducers.ts");
      }

      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        /* currentBoard: {
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
        } */
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
    case UPDATE_TASK:
      return {
        ...state,
        tasks:
          state.tasks.map((task) => {
            if (task.id === action.payload.id) {
              return {
                ...task,
                ...action.payload
              }
            }
            return task
          })
      }
    default:
      return state
  }
}
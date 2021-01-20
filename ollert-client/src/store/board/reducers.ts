import taskRepository from "../../api/taskRepository";
import { setCurrentBoard } from "./actions";
import { BoardState, BoardActionTypes, ADD_TASK, ADD_COLUMN, SET_CURRENT_BOARD, ADD_BOARDS, ADD_BOARD, UPDATE_COLUMN, Task, UPDATE_TASK, MOVE_TASK, ColumnnTask } from "./types";

// TODO make state flatter
// some duplicates going on inside currentBoard
const initialState: BoardState = {
  boards: [],
  currentBoard: null,
  columns: [],
  tasks: null
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
      const flatTasks: ColumnnTask = {}
      columns.forEach((col) => (
        flatTasks[col.id] = col.tasks.sort((a,b) => a.relativeOrder - b.relativeOrder)
      ))

      return {
        ...state,
        currentBoard: action.payload,
        columns: columns,
        tasks: flatTasks
      }
    case ADD_TASK:
      if (!state.currentBoard) {
        throw new Error("Current board is null, cannot add task: reducers.ts");
      }

      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.payload.columnId]:
            [...state.tasks![action.payload.columnId]].concat(action.payload)
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
    case MOVE_TASK:
      const {source, destination} = action.payload
      let sameCol = false
      if (source.columnId === destination.columnId) {
        sameCol = true
      }

      // Copy source col and remove task from column
      const sourceColTasks: Task[]  = [...state.tasks![source.columnId]]
      const task: Task = sourceColTasks.splice(source.index, 1)[0]

      // copy destination col
      const destColTasks: Task[] = [...state.tasks![destination.columnId]]
      // calculate new value for this task's order
      let newPos: number

      // check where task was dropped
      if (destColTasks.length === 0) {
        newPos = 20
      } 
      else if (destination.index === 0) {
        // dropped at top
        newPos = destColTasks[destination.index].relativeOrder - 10
      } else if (destination.index === destColTasks.length) {
        // dropped at bottom
        newPos = destColTasks[destination.index - 1].relativeOrder + 10
      } else {
        // dropped between tasks
        newPos = (
          destColTasks[destination.index].relativeOrder +
          destColTasks[destination.index-1].relativeOrder
        )/ 2
      }
      task.relativeOrder = newPos
      task.columnId = destination.columnId
      // this is a shit mix because of weird component rendering in react-dnd-beautiful
      task.loadedOnBoard = true

      if (sameCol) {
        destColTasks.splice(source.index, 1)
      }
      // add task to destination column
      destColTasks.splice(
        destination.index,
        0,
        task
      )

      return {
        ...state,
        tasks: {
          ...state.tasks,
          [source.columnId]: sourceColTasks,
          [destination.columnId]: destColTasks
        }
      }
    default:
      return state
  }
}
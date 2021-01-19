import taskRepository from "../../api/taskRepository";
import { setCurrentBoard } from "./actions";
import { BoardState, BoardActionTypes, ADD_TASK, ADD_COLUMN, SET_CURRENT_BOARD, ADD_BOARDS, ADD_BOARD, UPDATE_COLUMN, Task, UPDATE_TASK, MOVE_TASK, ColumnnTask } from "./types";

// TODO make state flatter
// some duplicates going on inside currentBoard
const initialState: BoardState = {
  boards: [],
  currentBoard: null,
  tasks: [],
  testColumns: [],
  testTasks: null
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

      const flatTasks: ColumnnTask = {}
      columns.forEach((col) => (
        flatTasks[col.id] = col.tasks
      ))

      /* const flatTasks: ColumnnTask = columns.map((col) => (
        {[col.id]: col.tasks}
      )) */

      return {
        ...state,
        currentBoard: action.payload,
        tasks: merged_tasks,
        testColumns: columns,
        testTasks: flatTasks
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
    case MOVE_TASK:
      const {taskId, source, destination} = action.payload
      let sameCol = false
      if (source.columnId === destination.columnId) {
        sameCol = true
      }

      // Copy source col and remove task from column
      const sourceColTasks: Task[]  = [...state.testTasks![source.columnId]]
      console.log('Source tasks')
      console.log(sourceColTasks)
      const task: Task = sourceColTasks.splice(source.index, 1)[0]
      console.log('..')
      console.log('After removing task')
      console.log(sourceColTasks)
      console.log('...')
      console.log('task!')
      console.log(task)

      // copy destination col
      const destColTasks: Task[] = [...state.testTasks![destination.columnId]]
      // calculate new value for this task's order
      let newPos: number

      if (destination.index === 0) {
        newPos = destColTasks[destination.index].relativeOrder - 10
      } else if (destination.index === destColTasks.length - 2) {
        newPos = destColTasks[destination.index].relativeOrder + 10
      } else {
        newPos = (
          destColTasks[destination.index].relativeOrder +
          destColTasks[destination.index-1].relativeOrder
        )/ 2
      }
      task.relativeOrder = newPos

      if (sameCol) {
        destColTasks.splice(source.index, 1)
      }
      // add task to destination column
      destColTasks.splice(
        destination.index,
        0,
        task
      )
      
      console.log('FINAL!')
      console.log(sourceColTasks)
      console.log(destColTasks)

      return {
        ...state,
        testTasks: {
          ...state.testTasks,
          [source.columnId]: sourceColTasks,
          [destination.columnId]: destColTasks
        }
      }
    default:
      return state
  }
}
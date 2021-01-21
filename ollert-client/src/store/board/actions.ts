import { ADD_BOARD, ADD_BOARDS, ADD_COLUMN, ADD_TASK, Board, BoardActionTypes, BoardDetail, ColumnDetail, DeleteBoard, DeleteColumn, DeleteTask, DELETE_BOARD, DELETE_COLUMN, DELETE_TASK, MoveTask, MOVE_TASK, SET_CURRENT_BOARD, Task, UpdateColumn, UpdateTask, UPDATE_COLUMN, UPDATE_TASK } from "./types";

// These action methods get called after the API responds
export const addBoards = (payload: Board[]) : BoardActionTypes => {
  return {
    type: ADD_BOARDS,
    payload: payload
  }
}

export const addBoard = (payload: Board): BoardActionTypes => {
  return {
    type: ADD_BOARD,
    payload: payload
  }
}

export const setCurrentBoard = (payload: BoardDetail): BoardActionTypes => {
  return {
    type: SET_CURRENT_BOARD,
    payload: payload
  }
}

export const addTask = (payload: Task): BoardActionTypes => {
  return {
    type: ADD_TASK,
    payload: payload
  }
}

export const addColumn = (payload: ColumnDetail): BoardActionTypes => {
  return {
    type: ADD_COLUMN,
    payload: payload
  }
}

export const updateColumn = (payload: UpdateColumn): BoardActionTypes => {
  return {
    type: UPDATE_COLUMN,
    payload: payload
  }
}

export const updateTask = (payload: UpdateTask): BoardActionTypes => {
  return {
    type: UPDATE_TASK,
    payload: payload
  }
}

export const moveTask = (payload: MoveTask): BoardActionTypes => {
  return {
    type: MOVE_TASK,
    payload: payload
  }
}

export const deleteTask = (payload: DeleteTask): BoardActionTypes => {
  return {
    type: DELETE_TASK,
    payload: payload
  }
}

export const deleteColumn = (payload: DeleteColumn): BoardActionTypes => {
  return {
    type: DELETE_COLUMN,
    payload: payload
  }
}

export const deleteBoard = (payload: DeleteBoard): BoardActionTypes => {
  return {
    type: DELETE_BOARD,
    payload: payload
  }
}
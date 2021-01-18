import { ADD_BOARD, ADD_BOARDS, ADD_COLUMN, ADD_TASK, Board, BoardActionTypes, BoardDetail, ColumnDetail, SET_CURRENT_BOARD, Task } from "./types";

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
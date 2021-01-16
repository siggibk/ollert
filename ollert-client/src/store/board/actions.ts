import { ADD_BOARDS, ADD_COLUMN, ADD_TASK, Board, BoardActionTypes, ColumnDetail, Task } from "./types";

// These action methods get called after the API responds
export function addBoards(payload: Board[]) : BoardActionTypes {
  return {
    type: ADD_BOARDS,
    payload: payload
  }
}

export function addTask(payload: Task): BoardActionTypes {
  console.log('In add task action actions.ts')
  return {
    type: ADD_TASK,
    payload: payload
  }
}

export function addColumn(payload: ColumnDetail): BoardActionTypes {
  return {
    type: ADD_COLUMN,
    payload: payload
  }
}
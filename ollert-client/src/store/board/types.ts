export const ADD_TASK = 'ADD_TASK'
export const DELETE_TASK = 'DELETE_TASK'
export const ADD_COLUMN = 'ADD_COLUMN'
export const DELETE_COLUMN = 'DELETE_COLUMN'
export const SET_CURRENT_BOARD = 'SET_CURRENT_BOARD'

// Board state interface
export interface BoardState {
  boards: Board[],
  currentBoard: Board | null,
  // test
  tasks: Task[]
}

// Input interfaces
export interface NewBoard {
  name: string
}

export interface NewColumn {
  name: string,
  boardId: string
}

export interface NewTask {
  name: string,
  description?: string,
  columnId: string
}

// models from API
export interface Board {
  id: string,
  name: string,
  createdAt: Date
}

export interface BoardDetail extends Board {
  columns: ColumnDetail[]
}

export interface ColumnDetail {
  id: string,
  name: string,
  createdAt: Date,
  tasks: Task[]
}

export interface Task {
  id: string,
  name: string,
  description: string | null,
  createdAt: Date
}

interface AddTaskAction {
  type: typeof ADD_TASK,
  payload: Task
}

interface AddColumnAction {
  type: typeof ADD_COLUMN,
  payload: ColumnDetail
}

interface SetCurrentBoardAction {
  type: typeof SET_CURRENT_BOARD,
  payload: Board
}

export type BoardActionTypes = AddTaskAction | AddColumnAction | SetCurrentBoardAction
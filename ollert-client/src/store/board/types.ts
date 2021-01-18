export const ADD_TASK = 'ADD_TASK'
export const DELETE_TASK = 'DELETE_TASK'
export const ADD_COLUMN = 'ADD_COLUMN'
export const DELETE_COLUMN = 'DELETE_COLUMN'
export const SET_CURRENT_BOARD = 'SET_CURRENT_BOARD'
export const ADD_BOARDS = 'ADD_BOARDS'
export const ADD_BOARD = 'ADD_BOARD'
export const UPDATE_COLUMN = 'UPDATE_COLUMN'

// Board state interface
export interface BoardState {
  boards: Board[],
  currentBoard: BoardDetail | null,
}

// Input interfaces
export interface NewBoard {
  name: string
}

export interface NewColumn {
  name?: string,
  boardId: string
}

export interface UpdateColumn {
  name?: string
  // only for reducer to help update state
  id?: string
}

export interface NewTask {
  name: string,
  description?: string,
  columnId?: string
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
  columnId: string,
  description: string | null,
  createdAt: Date
}

interface AddBoardsAction {
  type: typeof ADD_BOARDS,
  payload: Board[]
}

interface AddBoardAction {
  type: typeof ADD_BOARD,
  payload: Board
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
  payload: BoardDetail
}

interface UpdateColumnAction {
  type: typeof UPDATE_COLUMN,
  payload: UpdateColumn
}

export type BoardActionTypes = (
  AddTaskAction | AddColumnAction | SetCurrentBoardAction | AddBoardsAction |
  AddBoardAction | UpdateColumnAction
)

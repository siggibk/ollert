export const ADD_TASK = 'ADD_TASK'
export const DELETE_TASK = 'DELETE_TASK'
export const ADD_COLUMN = 'ADD_COLUMN'
export const DELETE_COLUMN = 'DELETE_COLUMN'
export const SET_CURRENT_BOARD = 'SET_CURRENT_BOARD'
export const ADD_BOARDS = 'ADD_BOARDS'
export const ADD_BOARD = 'ADD_BOARD'
export const UPDATE_COLUMN = 'UPDATE_COLUMN'
export const UPDATE_TASK = 'UPDATE_TASK'
export const MOVE_TASK = 'MOVE_TASK'

// Board state interface
export interface BoardState {
  boards: Board[],
  currentBoard: BoardDetail | null,
  columns: ColumnDetail[],
  tasks: ColumnnTask | null
}

export interface ColumnnTask {
  [key: string]: Task[]
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
  // only for reducer to help update the global state
  id?: string
}

export interface NewTask {
  name: string,
  description?: string,
  columnId?: string,
  relativeOrder?: number
}

export interface UpdateTask {
  name?: string,
  columnId?: string,
  relativeOrder?: number,
  // only for reducer to help update the global state
  id?: string
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
  relativeOrder: number,
  createdAt: Date,
  // client only variable
  loadedOnBoard?: boolean
}

export interface MoveTaskColumnInfo {
  index: number,
  columnId: string
}
export interface MoveTask {
  source: MoveTaskColumnInfo,
  destination: MoveTaskColumnInfo
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

interface UpdateTaskAction {
  type: typeof UPDATE_TASK,
  payload: UpdateTask

}

interface MoveTaskAction {
  type: typeof MOVE_TASK,
  payload: MoveTask
}

export type BoardActionTypes = (
  AddTaskAction | AddColumnAction | SetCurrentBoardAction | AddBoardsAction |
  AddBoardAction | UpdateColumnAction | UpdateTaskAction | MoveTaskAction
)

export interface Board {
  id: string, // guid
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
  description?: string
  createdAt: Date
}

export interface User {
  id: string,
  email: string
}
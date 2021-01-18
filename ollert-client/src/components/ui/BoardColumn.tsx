import React, { useState } from "react"
import { Card, CardContent, Divider, TextField } from "@material-ui/core"
import { useDispatch } from "react-redux"
import { ColumnDetail, NewTask } from "../../store/board/types"
import { NewTaskInput } from "../inputs/NewTaskInput"
import { TaskItem } from "./TaskItem"

import taskRepository from '../../api/taskRepository'
import { addTask } from "../../store/board/actions"

interface Props {
  column: ColumnDetail
}

export const BoardColumn = ({column} : Props) => {
  const [nameEditActive, setNameEditActive] = useState<boolean>(false)
  const [newName, setNewName] = useState<string>('')

  const dispatch = useDispatch()

  const createNewTask = async (task: NewTask) => {
    task.columnId = column.id
    try {
      const { data } = await taskRepository.create(task)
      dispatch(addTask(data))
    } catch (e) {
      console.log(e)
      console.log('Failed to add task')
    }
  }

  const updateName = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // update column name
      console.log(`Update name w. ${newName}`)

      // dispatch success
      setNewName('')
      setNameEditActive(false)
    }
  }

  const taskList = () => {
    return (
      <div>
        {column.tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    )
  }

  const noTasks = () => {
    return (
      <span>No tasks yet</span>
    )
  }

  const nameInput = () => {
    return (
      <TextField
        onBlur={() => setNameEditActive(false)}
        value={newName}
        autoFocus
        onChange={(e) => setNewName(e.target.value)} placeholder="Col name"
        onKeyPress={updateName}
      />
    )
  }

  const handleSetNameEditActive = () => {
    setNewName(column.name)
    setNameEditActive(true)
  }

  const columnName = () => {
    return (
      <div onClick={handleSetNameEditActive}>
        <span>{column.name} ({column.tasks.length} tasks)</span>
        <Divider />
      </div>
    )
  }

  return (
    <Card className="column" style={{overflow: 'auto'}}>
      <CardContent>
        <div className="column-title">
          {!column.name || nameEditActive ? nameInput() : columnName()}
        </div>
        {column.tasks.length > 0 ?  taskList() : noTasks()}
        <div className="new-task">
          <NewTaskInput onSubmit={createNewTask} />
        </div>
      </CardContent>
    </Card>
  )
}
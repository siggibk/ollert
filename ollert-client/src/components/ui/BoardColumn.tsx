import React, { useState } from "react"
import { Card, CardContent, Divider, makeStyles, TextField, Typography } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { ColumnDetail, NewTask, Task, UpdateColumn } from "../../store/board/types"
import { NewTaskInput } from "../inputs/NewTaskInput"
import { TaskItem } from "./TaskItem"
import { addTask, updateColumn } from "../../store/board/actions"

import taskRepository from '../../api/taskRepository'
import columnRepository from '../../api/columnRepository'
import { Droppable } from "react-beautiful-dnd"
import { RootState } from "../../store"


interface Props {
  column: ColumnDetail
}

const styles = makeStyles({
  content: {
    padding: '1rem'
  },
  droppable: {
    minHeight: '3rem'
  }
})

export const BoardColumn = ({column} : Props) => {
  const classes = styles()
  const [nameEditActive, setNameEditActive] = useState<boolean>(false)
  const [newName, setNewName] = useState<string>('')
  
  // tasks for this column
  const tasks: Task[] = useSelector(
    (state: RootState) => state.board.tasks![column.id]
  )

  const dispatch = useDispatch()

  const createNewTask = async (task: NewTask) => {
    // set new tasks position
    let taskPos: number = 20
    const tasksCopy: Task[]  = [...tasks]

    if (tasksCopy.length > 0) {
      const referenceTask: Task = tasksCopy.splice(tasksCopy.length-1, 1)[0]
      taskPos = taskPos + referenceTask.relativeOrder
    }

    task.columnId = column.id
    task.relativeOrder = taskPos

    try {
      const { data } = await taskRepository.create(task)
      dispatch(addTask(data))
    } catch (e) {
      console.log(e)
      console.log('Failed to add task')
    }
  }

  const updateName = async () => {
    if (newName === column.name) {
      return
    }

    // update column name
    console.log(`Update name w. ${newName}`)
    const updateDto: UpdateColumn  = {
      name: newName
    }

    await columnRepository.patch(column.id, updateDto)
    
    // add id to payload for reducers
    updateDto.id = column.id
    dispatch(updateColumn(updateDto))
    
    // reset newName and exit edit mode
    setNewName('')
    setNameEditActive(false)
  }

  const onNameBlur = async () => {
    if (newName !== column.name) {
      await updateName()
    } else {
      setNewName('')
      setNameEditActive(false)
    }
  }

  const onNameChange = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      await updateName()
    }
  }

  const nameInput = () => {
    return (
      <TextField
        onBlur={onNameBlur}
        value={newName}
        autoFocus
        onChange={(e) => setNewName(e.target.value)} placeholder="Col name"
        onKeyPress={onNameChange}
        fullWidth={true}
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
        <span>{column.name} ({tasks.length} tasks)</span>
        <Divider />
      </div>
    )
  }

  const noTasks = () => {
    return (
      <Typography color="textSecondary">
        No tasks in {column.name}
      </Typography>
    )
  }

  return (
    <Card className="column" style={{overflow: 'auto'}}>
      <CardContent className={classes.content}>
        <div className="column-title">
          {!column.name || nameEditActive ? nameInput() : columnName()}
        </div>
        <Droppable droppableId={column.id}>
          {(provided) =>
          <div className={classes.droppable} {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.length === 0 ? noTasks(): ''}
            {tasks.map((task, idx) => (
              <TaskItem key={task.id} task={task} index={idx} />
            ))}
            {provided.placeholder}
          </div>
          }
        </Droppable>
        <div className="new-task">
          <NewTaskInput onSubmit={createNewTask} />
        </div>
      </CardContent>
    </Card>
  )
}
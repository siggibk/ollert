import React, { useRef, useState } from "react"
import { Card, CardContent, Divider, makeStyles, Menu, MenuItem, TextField, Typography } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { ColumnDetail, DeleteColumn, NewTask, Task, UpdateColumn } from "../../store/board/types"
import { NewTaskInput } from "../inputs/NewTaskInput"
import { TaskItem } from "./TaskItem"
import { addTask, deleteColumn, updateColumn } from "../../store/board/actions"

import taskRepository from '../../api/taskRepository'
import columnRepository from '../../api/columnRepository'
import { Droppable } from "react-beautiful-dnd"
import { RootState } from "../../store"
import { DeleteOutline, MoreHorizOutlined } from "@material-ui/icons"


interface Props {
  column: ColumnDetail
}

const styles = makeStyles({
  content: {
    padding: '1rem'
  },
  droppable: {
    minHeight: '3rem'
  },
  newTask: {
    marginTop: '1rem'
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  actionIcon: {
    '&:hover': {
      cursor: 'pointer'
     },
  }
})

export const BoardColumn = ({column} : Props) => {
  const classes = styles()
  const [nameEditActive, setNameEditActive] = useState<boolean>(false)
  const [newName, setNewName] = useState<string>('')
  const [actionMenuOpen, setActionMenuOpen] = useState<boolean>(false)
  const [actionAnchorEl, setActionAnchorEl] = useState(null)

  // tasks for this column
  const tasks: Task[] = useSelector(
    (state: RootState) => state.board.tasks![column.id]
  )

  const dispatch = useDispatch()

  const handleDelete = async () => {
    const deletePayload: DeleteColumn = {
      id: column.id
    }
    
    await columnRepository.delete(column.id)
    dispatch(deleteColumn(deletePayload))
  }

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

  const handleActionClick = (e: any) => {
    setActionAnchorEl(e.currentTarget)
    setActionMenuOpen(true)
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
        <Typography variant="h6" component="h2" gutterBottom>
          {column.name}
        </Typography>
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
          <div className={classes.top}>
          <Typography color="textSecondary" gutterBottom>
            {tasks.length} tasks
          </Typography>
          <MoreHorizOutlined className={classes.actionIcon} onClick={handleActionClick} color="action" />
          <Menu
            keepMounted
            anchorEl={actionAnchorEl}
            open={actionMenuOpen}
            onClose={() => setActionMenuOpen(false)}
          >
            <MenuItem onClick={handleDelete}>Delete column</MenuItem>
          </Menu>
          </div>
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
        <div className={classes.newTask}>
          <NewTaskInput onSubmit={createNewTask} />
        </div>
      </CardContent>
    </Card>
  )
}
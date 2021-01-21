import { Card, CardContent, makeStyles, Menu, MenuItem, Typography } from '@material-ui/core'
import { MoreHorizOutlined } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import taskRepository from '../../api/taskRepository'
import { deleteTask } from '../../store/board/actions'
import { DeleteTask, Task, UpdateTask } from '../../store/board/types'

type TaskItemProps = {
  task: Task,
  index: number
}

const styles = makeStyles({
  content: {
    padding: '0.5rem',
    display: 'flex',
    justifyContent: 'space-between'
  },
  card: {
    marginBottom: '0.25rem'
  }
})

export const TaskItem = ({task, index}: TaskItemProps) => {
  const { id, columnId, relativeOrder, loadedOnBoard } = task
  const classes = styles()
  const dispatch = useDispatch()
  const [actionAnchorEl, setActionAnchorEl] = useState(null)
  const [actionMenuOpen, setActionMenuOpen] = useState(false)

  const handleDelete = async () => {
    const deletePayload: DeleteTask = {
      id: id,
      columnId: columnId
    }

    await taskRepository.delete(id)
    dispatch(deleteTask(deletePayload))
  }

  const handleActionClick = (e: any) => {
    setActionAnchorEl(e.currentTarget)
    setActionMenuOpen(true)
  }

  // update task order
  const updateTaskOrder = async () => {
    const taskDto: UpdateTask = {
      relativeOrder: relativeOrder,
      columnId: columnId
    }

    try {
      await taskRepository.patch(id, taskDto)
    } catch (e) {
      // failed to update
      console.log('Failed to update task order')
    }
  }

  // Find a better order solution  
  useEffect(() => {
    if (loadedOnBoard !== undefined) {
      updateTaskOrder()
    }
  }, [columnId, relativeOrder])

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Card variant="outlined" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={classes.card}>
        <CardContent className={classes.content}>
          <Typography color="textSecondary">
            {task.name}
          </Typography>
          <MoreHorizOutlined onClick={handleActionClick} />
          <Menu
            keepMounted
            anchorEl={actionAnchorEl}
            open={actionMenuOpen}
            onClose={() => setActionMenuOpen(false)}
          >
            <MenuItem onClick={handleDelete}>Delete task</MenuItem>
          </Menu>
        </CardContent>
      </Card>
      )}
    </Draggable>
  )
}
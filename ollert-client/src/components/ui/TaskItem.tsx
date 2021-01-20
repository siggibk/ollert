import { Card, CardContent, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useRef } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import taskRepository from '../../api/taskRepository'
import { updateTask } from '../../store/board/actions'
import { Task, UpdateTask } from '../../store/board/types'

type TaskItemProps = {
  task: Task,
  index: number
}

const styles = makeStyles({
  content: {
    padding: '0.25rem'
  },
  card: {
    marginBottom: '0.25rem'
  }
})

export const TaskItem = ({task, index}: TaskItemProps) => {
  const classes = styles()
  const { columnId, relativeOrder, loadedOnBoard } = task
  const dispatch = useDispatch()

  // update task order
  const updateTaskOrder = async () => {
    const taskDto: UpdateTask = {
      relativeOrder: relativeOrder,
      columnId: columnId
    }

    try {
      await taskRepository.patch(task.id, taskDto)
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
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={classes.card}>
        <CardContent className={classes.content}>
          <Typography color="textSecondary">
            {task.name}
          </Typography>
        </CardContent>
      </Card>
      )}
    </Draggable>
  )
}
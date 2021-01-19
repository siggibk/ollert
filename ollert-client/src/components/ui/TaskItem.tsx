import { Card, CardContent } from '@material-ui/core'
import React, { useEffect } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import taskRepository from '../../api/taskRepository'
import { updateTask } from '../../store/board/actions'
import { Task, UpdateTask } from '../../store/board/types'


type TaskItemProps = {
  task: Task,
  index: number
}

export const TaskItem = ({task, index}: TaskItemProps) => {
  /* const dispatch = useDispatch()

  // update task order
  const updateTaskOrder = async () => {
    console.log(`${task.name} is ${index}`)

    const taskDto: UpdateTask = {
      relativeOrder: index
    }
    // update state
    dispatch(updateTask({...taskDto, id: task.id}))

    try {
      await taskRepository.patch(task.id, taskDto)
    } catch (e) {
      // failed to update
      console.log('Failed to update task order')
    }
  }

  // Find a better order solution  
  useEffect(() => {
    updateTaskOrder()
  }, [index])
 */
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="task-item">
        <CardContent>
          <div>{task.name}</div>
          <div>idx {index}</div>
          <hr />
          <div>rel {task.relativeOrder}</div>
        </CardContent>
      </Card>
      )}
    </Draggable>
  )
}
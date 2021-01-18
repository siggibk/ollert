import { Card, CardContent } from '@material-ui/core'
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Task } from '../../store/board/types'


type TaskItemProps = {
  task: Task,
  index: number
}

export const TaskItem = ({task, index}: TaskItemProps) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="task-item">
        <CardContent>
          {task.name}
        </CardContent>
      </Card>
      )}
    </Draggable>
  )
}
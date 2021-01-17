import { Card, CardContent } from '@material-ui/core'
import React from 'react'
import { Task } from '../../store/board/types'


type TaskItemProps = {
  task: Task
}

export const TaskItem = ({task}: TaskItemProps) => {
  return (
    <Card className="task-item">
      <CardContent>
        {task.name}
      </CardContent>
    </Card>
  )
}
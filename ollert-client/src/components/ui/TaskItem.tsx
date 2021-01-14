import React from 'react'
import { Task } from '../../shared/types'


type TaskItemProps = {
  task: Task
}

export const TaskItem = ({task}: TaskItemProps) => {
  return (
    <div>
      <h2>Task!</h2>
      <div>{task.name}</div>
    </div>
  )
}
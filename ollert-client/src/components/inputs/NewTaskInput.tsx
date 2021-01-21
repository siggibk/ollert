import { TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { NewTask } from '../../store/board/types'

interface Props {
  onSubmit: (task: NewTask) => void
}

export const NewTaskInput = ({onSubmit}: Props) => {
  const [name, setName] = useState<string>('')

  const handleAddTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const task: NewTask = {
        name: name
      }
      onSubmit(task)
      setName('')
    }
  }

  return (
    <div>
      <TextField
        variant="outlined"
        type="text"
        label="New task"
        size="small"
        onChange={(e) => setName(e.target.value)}
        onKeyPress={handleAddTask}
        value={name}
        fullWidth={true}
      />
    </div>
  )
}

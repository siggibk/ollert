import { TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { NewTask } from '../../store/board/types'

interface Props {
  onSubmit: (task: NewTask) => void
}

export const NewTaskInput = ({onSubmit}: Props) => {
  const [name, setName] = useState<string>('')

  const handleAddTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(`Received event ${e.key}`)
    if (e.key === 'Enter') {
      console.log("Enter was clicked")

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
        type="text"
        placeholder="Do laundry"
        onChange={(e) => setName(e.target.value)}
        onKeyPress={handleAddTask}
        value={name}
        fullWidth={true}
      />
    </div>
  )
}

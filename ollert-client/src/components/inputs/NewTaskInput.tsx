import { TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTask } from '../../store/board/actions'
import { Task } from '../../store/board/types'

const NewTaskInput: React.FC = () => {
  const [name, setName] = useState('')
  // hook that returns dispatch method
  const dispatch = useDispatch()

  function handleAddTask(e: React.KeyboardEvent<HTMLInputElement>) {
    console.log(`Received event ${e.key}`)
    if (e.key === 'Enter') {
      // API CALL
      const task: Task = {
        id: '1234',
        name: name,
        description: 'Task description',
        createdAt: new Date()
      }

      dispatch(addTask(task))
      console.log("Enter was clicked")
      console.log('In new task input about to dispatch')
    }
  }

  /* useCallback is a hook that return a memoized fn
  const saveTask = useCallback((task: Task) => {
    dispatch(addTask(task))
  }, [deps])
  */

  return (
    <div>
      <TextField
        type="text"
        placeholder="Next task?"
        onChange={(e) => setName(e.target.value)}
        onKeyPress={handleAddTask}
      />
    </div>
  )
}

export default NewTaskInput
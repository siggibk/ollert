import React, { createRef, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { addTask } from '../../store/board/actions'
import { Task } from '../../store/board/types'

const NewTaskInput: React.FC = () => {
  // hook that returns dispatch method
  const dispatch = useDispatch()
  const textInput: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>()

  const tasks: Task[] = useSelector(
    (state: RootState) => state.board.tasks
  )

  function handleAddTask(e: React.KeyboardEvent<HTMLInputElement>) {
    console.log(`Received event ${e.key}`)
    if (e.key === 'Enter') {
      const task: Task = {
        id: '1234',
        name: 'Task name',
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
      {tasks.length}
      {tasks.map((task) => {
        <div>{task.name}</div>
      })}
      <input
        type="text"
        placeholder="Next task?"
        ref={textInput}
        onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => handleAddTask(e)}
      />
    </div>
  )
}

export default NewTaskInput
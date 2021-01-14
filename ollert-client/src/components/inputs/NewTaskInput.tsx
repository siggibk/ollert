import React, { createRef } from 'react'

const NewTaskInput: React.FC = () => {
  const textInput: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>()
  
  function addTask(e: React.KeyboardEvent<HTMLInputElement>) {
    console.log(`Received event ${e.key}`)
    if (e.key === 'Enter') {
      console.log("Enter was clicked")
    }
  }

  return (
    <input
      type="text"
      placeholder="Next task?"
      ref={textInput}
      onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => addTask(e)}
    />
  )
}

export default NewTaskInput
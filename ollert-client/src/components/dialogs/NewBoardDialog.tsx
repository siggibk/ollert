import React, { useState } from 'react'
import { Button, Dialog, DialogTitle, DialogActions, TextField, DialogContent } from '@material-ui/core'
import { NewBoard } from '../../store/board/types'
import boardRepository from '../../api/boardRepository'
import { useHistory } from 'react-router-dom'

type Props = {
  isOpen: boolean,
  onClose: () => void
}

export const NewBoardDialog = ({isOpen, onClose}: Props) => {
  const [name, setName] = useState('')
  const history = useHistory()

  const onSubmit = async () => {
    const newBoard: NewBoard = {
      name: name
    }

    const { data } = await boardRepository.create(newBoard)
    history.push(`boards/${data.id}`)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit()
    }
  }

  return (
    <Dialog open={isOpen} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New board</DialogTitle>
        <DialogContent>
          <TextField
            onChange={(e) => setName(e.target.value)}
            onKeyPress={handleKeyPress}
            // autoFocus
            margin="dense"
            id="board-name"
            label="Board name"
            type="text"
            fullWidth
            autoFocus={true}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onSubmit} color="primary">
            Create board
          </Button>
        </DialogActions>
      </Dialog>
  )
}
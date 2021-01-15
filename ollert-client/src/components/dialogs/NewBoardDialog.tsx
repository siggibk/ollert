import React, { useState } from 'react'
import { Button, Dialog, DialogTitle, DialogActions, TextField, DialogContent } from '@material-ui/core'

type Props = {
  isOpen: boolean,
  onClose?: () => void,
  onSuccess: () => void
}

export const NewBoardDialog = ({isOpen, onClose, onSuccess}: Props) => {
  const [name, setName] = useState('')

  const onSubmit = () => {
    console.log(`Create board ${name}`)

    // if success call onSuccess
    // onSuccess()
  }

  return (
    <Dialog open={isOpen} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New board</DialogTitle>
        <DialogContent>
          <TextField
            onChange={(e) => setName(e.target.value)}
            // autoFocus
            margin="dense"
            id="board-name"
            label="Board name"
            type="text"
            fullWidth
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